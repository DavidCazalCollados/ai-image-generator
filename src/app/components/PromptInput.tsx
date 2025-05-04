"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';

interface PromptInputProps {
  onGenerate: (prompt: string, imageUrl: string | null) => void;
  isLoading: boolean;
}

export default function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [imageInputType, setImageInputType] = useState<'none' | 'upload' | 'url'>('none');
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, referenceImage);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl.trim()) {
      setReferenceImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setReferenceImage(null);
    setImageUrl('');
    setImageInputType('none');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
          placeholder="Exemple: A bright appartement un Paris"
          required
        />

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-md">Reference (optionnelle)</label>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setImageInputType(imageInputType === 'upload' ? 'none' : 'upload')}
              className="px-3 py-1 text-sm font-medium border rounded-md hover:bg-gray-100"
            >
              {imageInputType === 'upload' ? 'Cancel' : 'Upload an image'}
            </button>

            <button
              type="button"
              onClick={() => setImageInputType(imageInputType === 'url' ? 'none' : 'url')}
              className="px-3 py-1 text-sm font-medium border rounded-md hover:bg-gray-100"
            >
              {imageInputType === 'url' ? 'Cancel' : 'URL'}
            </button>
          </div>

          {imageInputType === 'upload' && (
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          )}

          {imageInputType === 'url' && (
            <div className="flex space-x-2">
              <input
                type="url"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="https://exemple.com/image.jpg"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleImageUrlSubmit}
                className="px-3 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          )}

          {referenceImage && (
            <div className="relative w-full max-w-xs">
              <Image
                src={referenceImage}
                alt="Image de référence"
                width={300}
                height={300}
                className="w-full h-auto rounded-lg border object-contain"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={`px-4 py-2 font-bold text-white bg-yellow-800 rounded-lg hover:bg-yellow-800 transition-colors ${(isLoading || !prompt.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Generation...' : "Generate image"}
        </button>
      </div>
    </form>
  );
}

// "use client";
// import { useState } from 'react';

// interface PromptInputProps {
//   onGenerate: (prompt: string) => void;
//   isLoading: boolean;
// }

// export default function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
//   const [prompt, setPrompt] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (prompt.trim()) {
//       onGenerate(prompt);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-xl">
//       <div className="flex flex-col space-y-4">
//         <label htmlFor="prompt" className="font-medium text-md">
//           Describe the image you want to generate.
//         </label>
//         <textarea
//           id="prompt"
//           className="w-full p-3 border border-gray-400 rounded-lg outline-none ring-0
//             focus:ring focus:ring-yellow-800 focus:border-yellow-800 focus:outline-none
//           active:border-yellow-800 active:outline-none !ring-opacity-50"
//           rows={4}
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Exemple: une ville futuriste la nuit avec des néons"
//           required
//         />
//         <button
//           type="submit"
//           disabled={isLoading || !prompt.trim()}
//           className={`px-4 py-2 font-bold text-white bg-yellow-800 rounded-lg hover:bg-yellow-800 transition-colors ${(isLoading || !prompt.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {isLoading ? 'Génération en cours...' : "Générer l'image"}
//         </button>
//       </div>
//     </form>
//   );
// }
