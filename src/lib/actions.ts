"use server";

import {
  aiGeneratedTripItinerary,
  type AiGeneratedTripItineraryInput,
  type AiGeneratedTripItineraryOutput,
} from "@/ai/flows/ai-generated-trip-itinerary-flow";

export async function generateItineraryAction(
  input: AiGeneratedTripItineraryInput
): Promise<AiGeneratedTripItineraryOutput | { error: string }> {
  try {
    const output = await aiGeneratedTripItinerary(input);
    return output;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return { error: "Failed to generate itinerary. Please try again." };
  }
}
