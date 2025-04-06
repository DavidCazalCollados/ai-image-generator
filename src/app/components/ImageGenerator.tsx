"use client";

import { useState } from 'react';
import PromptInput from './PromptInput';
import ImageDisplay from './ImageDisplay';

export default function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (inputPrompt: string) => {
    setIsLoading(true);
    setPrompt(inputPrompt);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de l&apos;image');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la génération de l&apos;image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      <PromptInput onGenerate={generateImage} isLoading={isLoading} />
      <ImageDisplay imageUrl={imageUrl} prompt={prompt} isLoading={isLoading} />
    </div>
  );
}
