import ImageGenerator from './components/ImageGenerator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="flex flex-col items-center max-w-5xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center">Homagine</h1>
        <p className="text-lg text-center subtext font-normal">
        Enter a description and our AI will generate a custom image to inspire your home decor.
        </p>
        <ImageGenerator />
      </div>
    </main>
  );
}
