import TravelAssistance from "@/components/travel-assistance";

export default function TravelAssistancePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Travel Assistance
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Plan your complete trip with our smart assistance module. Find routes, hotels, and estimate your costs.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <TravelAssistance />
      </div>
    </div>
  );
}
