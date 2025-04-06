// src/app/api/generate-image/route.ts (or similar path)

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialiser le client OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Le prompt est requis' }, { status: 400 });
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    // Defensive check: Ensure data and url exist before accessing
    const imageUrl = response?.data?.[0]?.url;

    if (!imageUrl) {
        // Handle cases where the structure isn't as expected, even if API call succeeded
        console.error('OpenAI response missing image URL:', response);
        throw new Error('Réponse invalide de l&apos;API OpenAI');
    }

    return NextResponse.json({ imageUrl });

  } catch (error: unknown) { // <-- Change 'any' to 'unknown'
    console.error('Erreur API:', error); // Log the raw error

    let errorMessage = 'Une erreur est survenue lors de la génération de l&apos;image'; // Default message

    // --- Type Checking ---
    if (error instanceof Error) {
      // It's a standard JavaScript Error object, safe to access .message
      errorMessage = error.message;
    }
    // Optional: Check for specific OpenAI API errors if needed
    else if (error instanceof OpenAI.APIError) {
         errorMessage = `Erreur OpenAI API (${error.status}): ${error.message}`;
         // You might want different status codes based on error.status
    }
    // You could add more checks here if needed (e.g., if (typeof error === 'string'))

    // --- Return Response ---
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 } // Keep 500 for general server-side errors
    );
  }
}
