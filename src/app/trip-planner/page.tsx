import TripPlannerClient from "@/components/planner/trip-planner-client";

export default function TripPlannerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          AI Trip Planner
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Let our AI craft the perfect Kanyakumari itinerary for you. Just tell
          us your preferences!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <TripPlannerClient />
      </div>
    </div>
  );
}
