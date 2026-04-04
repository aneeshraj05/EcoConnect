import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="container flex flex-1 items-center justify-center text-center">
      <div className="space-y-6 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
          Welcome to EcoConnect
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Your centralized and verified platform for exploring Kanyakumari.
          Discover hidden gems, book eco-friendly stays, and connect with local
          communities.
        </p>
        <div className="flex justify-center gap-4 pt-8">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/explore">Explore Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
