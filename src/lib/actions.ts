
"use server";

import {
  type AiGeneratedTripItineraryInput,
  type AiGeneratedTripItineraryOutput,
} from "@/ai/flows/ai-generated-trip-itinerary-flow";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export async function generateItineraryAction(
  input: AiGeneratedTripItineraryInput
): Promise<AiGeneratedTripItineraryOutput | { error: string }> {
  // Simulate network delay to make it feel like an AI is working
  await wait(1500);

  // Create a sample itinerary based on the user's input
  const itineraryDays = [];
  const sampleActivities = [
    "Visit Vivekananda Rock Memorial and Thiruvalluvar Statue by ferry.",
    "Witness the breathtaking sunset at Kanyakumari Beach.",
    "Explore the local markets for seashell souvenirs.",
    "Visit the Gandhi Memorial Mandapam.",
    "Take a trip to the historic Vattakottai Fort.",
    "Enjoy a traditional South Indian thali for lunch.",
    "Attend a cultural show in the evening.",
    "Experience a catamaran ride with local fishermen.",
    "Visit the Thanumalayan Temple in Suchindram."
  ];

  for (let i = 1; i <= input.durationDays; i++) {
    const dailyActivities = [];
    // Simple logic to assign activities to days to avoid randomness on server
    dailyActivities.push(sampleActivities[((i-1) * 2) % sampleActivities.length]);
    dailyActivities.push(sampleActivities[((i-1) * 2 + 1) % sampleActivities.length]);
    
    itineraryDays.push({
      day: i,
      activities: dailyActivities,
    });
  }

  const sampleOutput: AiGeneratedTripItineraryOutput = {
    itinerary: itineraryDays,
    recommendations: [
      "Try the local filter coffee.",
      "Don't miss the sunrise view from the beach.",
      "Consider a day trip to Padmanabhapuram Palace.",
    ],
    notes: "This is a sample itinerary. Ferry services to Vivekananda Rock depend on weather conditions. It's best to check timings locally.",
  };

  return sampleOutput;
}
