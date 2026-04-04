import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, DollarSign, MapPin, Search } from 'lucide-react';
import { featuredPlaces, localExperiences } from '@/lib/data';
import PlaceCard from '@/components/place-card';
import { placeholderImages } from '@/lib/placeholder-images';

function HeroSearchForm() {
  return (
    <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-black/70 rounded-xl shadow-2xl">
      <CardHeader>
        <Tabs defaultValue="places">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="places">Places</TabsTrigger>
            <TabsTrigger value="stays">Stays</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
          </TabsList>
          <TabsContent value="places">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search destinations" className="pl-10" />
              </div>
              <Button size="lg" className="w-full md:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="stays">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Where to?" className="pl-10" />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Check-in - Check-out" className="pl-10" />
              </div>
              <Button size="lg" className="w-full md:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="experiences">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search experiences" className="pl-10" />
              </div>
              <Button size="lg" className="w-full md:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero-kanyakumari");

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center text-center">
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
            Discover Kanyakumari
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            Your gateway to the southernmost tip of India. Explore, book, and
            experience.
          </p>
          <div className="pt-8">
            <HeroSearchForm />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Featured Attractions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Local Experiences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {localExperiences.slice(0, 3).map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
