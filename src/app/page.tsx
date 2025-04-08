import ImageGenerator from './components/ImageGenerator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 py-13 sm:p-6 md:p-24">
      <div className="flex flex-col items-center max-w-5xl w-full space-y-13 sm:space-y-15">
        <div className="flex flex-col items-center max-w-5xl w-full space-y-5 sm:space-y-6">
          <h1 className="sm:text-6xl text-5xl font-bold text-center">Homagine</h1>
          <p className="border rounded-md p-2 text-md text-justify sm:text-center subtext font-normal">
            Find your style, one room at a time.
          </p>
        </div>
        <ImageGenerator />
      </div>
    </main>
  );
}
