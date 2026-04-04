import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import type { Place } from "@/lib/data";

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const image = placeholderImages.find((img) => img.id === place.imageId);

  return (
    <Link href={`/explore/${place.id}`}>
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0 relative">
          <div className="aspect-video relative">
            {image && (
              <Image
                src={image.imageUrl}
                alt={place.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            )}
            <div className="absolute top-2 right-2">
              {place.rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {place.rating.toFixed(1)}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold leading-snug mb-2">
            {place.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {place.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {place.price ? (
            <p className="font-semibold">
              ₹{place.price}
              <span className="text-sm font-normal text-muted-foreground">
                /person
              </span>
            </p>
          ) : (
            <Badge variant="outline">{place.category}</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
