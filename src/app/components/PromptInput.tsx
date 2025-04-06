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
        <label htmlFor="prompt" className="text-lg font-medium">
          Décrivez l&apos;image que vous souhaitez générer
        </label>
        <textarea
          id="prompt"
          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Exemple: une ville futuriste la nuit avec des néons"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={`px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors ${(isLoading || !prompt.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Génération en cours...' : "Générer l'image"}
        </button>
      </div>
    </form>
  );
}
