'use client';
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { aiPoweredRecommendations } from "@/ai/flows/ai-powered-recommendations-flow";
import PlaceCard from "@/components/place-card";
import { useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

function Recommendations({ viewingHistory, preferences }: { viewingHistory: string[], preferences: string[] }) {
  const [recommendations, setRecommendations] = React.useState<any>(null);

  React.useEffect(() => {
    async function getRecs() {
      const recs = await aiPoweredRecommendations({
        viewingHistory,
        preferences,
      });
      setRecommendations(recs);
    }
    getRecs();
  }, [viewingHistory, preferences]);

  if (!recommendations) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.recommendations.map((rec: any) => {
        const place = {
          id: rec.name.toLowerCase().replace(/ /g, '-'),
          name: rec.name,
          description: rec.description,
          category: rec.category as any,
          imageId: 'vivekananda-rock', // Use a default image
        }
        return <PlaceCard key={rec.name} place={place} />
      })}
    </div>
  )
}

export default function DashboardPage() {
  const { user, isLoading } = useUser();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-5 w-64" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Welcome, {user?.displayName || 'Explorer'}!</h1>
              <p className="text-muted-foreground">
                Here&apos;s your personal travel dashboard.
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            {user?.photoURL && <AvatarImage src={user.photoURL} alt="User Avatar" />}
            <AvatarFallback>{user?.displayName?.charAt(0) || 'A'}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Your Next Adventure</CardTitle>
          <CardDescription>
            Use our AI-powered trip planner to create your perfect Kanyakumari
            itinerary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/trip-planner">Go to Trip Planner</Link>
          </Button>
        </CardContent>
      </Card>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
        <Recommendations viewingHistory={["Vivekananda Rock Memorial"]} preferences={["beach", "historical"]} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">You have no recent bookings.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
