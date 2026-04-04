'use server';
/**
 * @fileOverview A Genkit flow for generating custom trip itineraries for Kanyakumari.
 *
 * - aiGeneratedTripItinerary - A function that generates a custom trip itinerary.
 * - AiGeneratedTripItineraryInput - The input type for the aiGeneratedTripItinerary function.
 * - AiGeneratedTripItineraryOutput - The return type for the aiGeneratedTripItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGeneratedTripItineraryInputSchema = z.object({
  interests: z
    .array(z.string())
    .describe("User's interests (e.g., 'historical sites', 'beaches', 'nature', 'local cuisine')."),
  durationDays: z.number().min(1).describe('Preferred duration of the trip in days.'),
  budget: z
    .enum(['low', 'medium', 'high'])
    .describe("User's budget preference ('low', 'medium', or 'high')."),
});
export type AiGeneratedTripItineraryInput = z.infer<
  typeof AiGeneratedTripItineraryInputSchema
>;

const AiGeneratedTripItineraryOutputSchema = z.object({
  itinerary: z
    .array(
      z.object({
        day: z.number().describe('The day number of the itinerary.'),
        activities: z
          .array(z.string())
          .describe('A list of activities planned for the day.'),
      })
    )
    .describe('A structured daily itinerary for the trip.'),
  recommendations: z
    .array(z.string())
    .describe('Additional recommendations for places or experiences.'),
  notes: z.string().optional().describe('Any additional notes or tips for the trip.'),
});
export type AiGeneratedTripItineraryOutput = z.infer<
  typeof AiGeneratedTripItineraryOutputSchema
>;

export async function aiGeneratedTripItinerary(
  input: AiGeneratedTripItineraryInput
): Promise<AiGeneratedTripItineraryOutput> {
  return aiGeneratedTripItineraryFlow(input);
}

const itineraryPrompt = ai.definePrompt({
  name: 'itineraryPrompt',
  input: {schema: AiGeneratedTripItineraryInputSchema},
  output: {schema: AiGeneratedTripItineraryOutputSchema},
  prompt: `You are an AI travel agent specializing in Kanyakumari, India. Your task is to create a detailed and engaging custom trip itinerary based on user preferences.

Kanyakumari is a coastal town in Tamil Nadu, India, at the southernmost tip of the Indian subcontinent. It is known for its unique sunrise and sunset views over the confluence of the Arabian Sea, the Bay of Bengal, and the Indian Ocean.

User Interests: {{{interests}}}
Preferred Duration: {{{durationDays}}} days
Budget: {{{budget}}}

Create a day-by-day itinerary, including specific activities and recommended sights. Also, provide additional recommendations and any useful notes or tips for the trip.

Ensure the itinerary is realistic for the given duration and budget. Focus on popular and unique attractions in and around Kanyakumari.

Example attractions:
- Vivekananda Rock Memorial
- Thiruvalluvar Statue
- Kanyakumari Beach / Sunrise & Sunset Point
- Our Lady of Ransom Church
- Bhagavathy Amman Temple
- Gandhi Memorial Mandapam
- Vattakottai Fort
- Suchindram Thanu Anumalaya Swamy Temple
- Padmanabhapuram Palace (requires travel outside Kanyakumari town, consider budget and duration)
- Local markets for souvenirs
- Sampling local South Indian cuisine

Structure the output as a JSON object strictly following the provided schema.`,
});

const aiGeneratedTripItineraryFlow = ai.defineFlow(
  {
    name: 'aiGeneratedTripItineraryFlow',
    inputSchema: AiGeneratedTripItineraryInputSchema,
    outputSchema: AiGeneratedTripItineraryOutputSchema,
  },
  async input => {
    const {output} = await itineraryPrompt(input);
    return output!;
  }
);
