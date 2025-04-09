"use client";
import { useState } from 'react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export default function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col space-y-4">
        <label htmlFor="prompt" className="font-medium text-md">
          Describe the image you want to generate.
        </label>
        <textarea
          id="prompt"
          className="w-full p-3 border border-gray-400 rounded-lg outline-none ring-0
            focus:ring focus:ring-yellow-800 focus:border-yellow-800 focus:outline-none
          active:border-yellow-800 active:outline-none !ring-opacity-50"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Exemple: une ville futuriste la nuit avec des néons"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={`px-4 py-2 font-bold text-white bg-yellow-800 rounded-lg hover:bg-yellow-800 transition-colors ${(isLoading || !prompt.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Génération en cours...' : "Générer l'image"}
        </button>
      </div>
    </form>
  );
}
