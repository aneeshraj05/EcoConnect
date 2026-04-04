import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero-kanyakumari");

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-screen flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            Welcome to EcoConnect
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            Your centralized and verified platform for exploring Kanyakumari. 
            Discover hidden gems, book eco-friendly stays, and connect with local communities.
          </p>
          <div className="pt-8 flex gap-4 justify-center">
            <Button asChild size="lg">
                <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
                <Link href="/explore">Explore Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
