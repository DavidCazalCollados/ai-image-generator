"use client";
import Image from 'next/image';

interface ImageDisplayProps {
  imageUrl: string | null;
  prompt: string | null;
  isLoading: boolean;
}

interface ImageDisplayProps {
  imageUrl: string | null;
  prompt: string | null;
  isLoading: boolean;
}

export default function ImageDisplay({ imageUrl, prompt, isLoading }: ImageDisplayProps) {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-generated-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="w-full max-w-md flex flex-col space-y-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt={prompt || "Image générée par IA"}
          className="w-full h-auto"
        />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
      >
        Télécharger l&apos;image
      </button>
    </div>
  );
}
