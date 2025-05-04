import { NextResponse } from 'next/server';
import Replicate from 'replicate';

// Définir une interface pour les paramètres d'entrée de l'API Replicate
interface ReplicateInput {
  prompt: string;
  negative_prompt: string;
  width: number;
  height: number;
  num_outputs: number;
  guidance_scale: number;
  prompt_strength: number;
  num_inference_steps: number;
  image?: string; // Optionnel pour l'image de référence
}

export async function POST(request: Request) {
  try {
    const { prompt, imageUrl } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const model = "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38";

    const enhancedPrompt = `Interior design, ${prompt}, professional photograph, detailed, 8k, realistic, natural lighting`;

    // Préparer les inputs avec le typage approprié
    const input: ReplicateInput = {
      prompt: enhancedPrompt,
      negative_prompt: "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
      width: 1024,
      height: 1024,
      num_outputs: 1,
      guidance_scale: 15,
      prompt_strength: 0.8,
      num_inference_steps: 50
    };

    // Si une image de référence est fournie, l'ajouter aux inputs
    if (imageUrl) {
      input.image = imageUrl;
    }

    const output = await replicate.run(model, {
      input: input
    });

    // Replicate renvoie un tableau avec l'URL de l'image générée
    const generatedImageUrl = Array.isArray(output) ? output[0] : null;

    return NextResponse.json({ imageUrl: generatedImageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}


// import { NextResponse } from 'next/server';
// import Replicate from 'replicate';

// export async function POST(request: Request) {
//   try {
//     const { prompt } = await request.json();

//     if (!prompt) {
//       return NextResponse.json(
//         { error: 'Prompt is required' },
//         { status: 400 }
//       );
//     }

//     const replicate = new Replicate({
//       auth: process.env.REPLICATE_API_TOKEN,
//     });

//     const model = "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38";

//     const enhancedPrompt = `Interior design, ${prompt}, professional photograph, detailed, 8k, realistic, natural lighting`;

//     const output = await replicate.run(model, {
//       input: {
//         prompt: enhancedPrompt,
//         negative_prompt: "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
//         width: 1024,
//         height: 1024,
//         num_outputs: 1
//       }
//     });

// // Replicate renvoie un tableau avec l'URL de l'image générée
//     const imageUrl = Array.isArray(output) ? output[0] : null;

//     return NextResponse.json({ imageUrl });
//   } catch (error) {
//     console.error('Error generating image:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate image' },
//       { status: 500 }
//     );
//   }
// }




// // src/app/api/generate-image/route.ts (or similar path)

// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// // Initialiser le client OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     const { prompt } = await request.json();

//     if (!prompt) {
//       return NextResponse.json({ error: 'Le prompt est requis' }, { status: 400 });
//     }

//     const response = await openai.images.generate({
//       model: "dall-e-3",
//       prompt: prompt,
//       n: 1,
//       size: "1024x1024",
//     });

//     // Defensive check: Ensure data and url exist before accessing
//     const imageUrl = response?.data?.[0]?.url;

//     if (!imageUrl) {
//         // Handle cases where the structure isn't as expected, even if API call succeeded
//         console.error('OpenAI response missing image URL:', response);
//         throw new Error('Réponse invalide de l&apos;API OpenAI');
//     }

//     return NextResponse.json({ imageUrl });

//   } catch (error: unknown) { // <-- Change 'any' to 'unknown'
//     console.error('Erreur API:', error); // Log the raw error

//     let errorMessage = 'Une erreur est survenue lors de la génération de l&apos;image'; // Default message

//     // --- Type Checking ---
//     if (error instanceof Error) {
//       // It's a standard JavaScript Error object, safe to access .message
//       errorMessage = error.message;
//     }
//     // Optional: Check for specific OpenAI API errors if needed
//     else if (error instanceof OpenAI.APIError) {
//          errorMessage = `Erreur OpenAI API (${error.status}): ${error.message}`;
//          // You might want different status codes based on error.status
//     }
//     // You could add more checks here if needed (e.g., if (typeof error === 'string'))

//     // --- Return Response ---
//     return NextResponse.json(
//       { error: errorMessage },
//       { status: 500 } // Keep 500 for general server-side errors
//     );
//   }
// }
