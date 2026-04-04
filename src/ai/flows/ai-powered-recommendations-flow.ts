'use server';
/**
 * @fileOverview Provides AI-powered personalized recommendations for attractions and local experiences in Kanyakumari.
 *
 * - aiPoweredRecommendations - A function that generates personalized recommendations.
 * - AiPoweredRecommendationsInput - The input type for the aiPoweredRecommendations function.
 * - AiPoweredRecommendationsOutput - The return type for the aiPoweredRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPoweredRecommendationsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('A list of attraction or experience names the user has previously viewed.'),
  preferences: z
    .array(z.string())
    .describe(
      'A list of user preferences, e.g., "adventure", "cultural", "beach", "budget-friendly".'
    ),
});
export type AiPoweredRecommendationsInput = z.infer<
  typeof AiPoweredRecommendationsInputSchema
>;

const AiPoweredRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        name: z.string().describe('The name of the recommended attraction or experience.'),
        description:
          z.string().describe('A brief description of the recommended attraction or experience.'),
        category:
          z.string().describe('The category of the recommendation (e.g., "Historical Site", "Beach", "Cultural Experience", "Nature").'),
        reason:
          z.string().describe('A clear reason why this recommendation is suitable for the user, linking it to their history or preferences.'),
      })
    )
    .describe('An array of personalized recommendations for Kanyakumari.'),
});
export type AiPoweredRecommendationsOutput = z.infer<
  typeof AiPoweredRecommendationsOutputSchema
>;

export async function aiPoweredRecommendations(
  input: AiPoweredRecommendationsInput
): Promise<AiPoweredRecommendationsOutput> {
  return aiPoweredRecommendationsFlow(input);
}

const aiPoweredRecommendationsPrompt = ai.definePrompt({
  name: 'aiPoweredRecommendationsPrompt',
  input: { schema: AiPoweredRecommendationsInputSchema },
  output: { schema: AiPoweredRecommendationsOutputSchema },
  prompt: `You are an expert travel guide for Kanyakumari, specializing in personalized recommendations.
Your goal is to suggest relevant attractions and local experiences for a user based on their past viewing history and stated preferences.
Kanyakumari is a coastal town at the southernmost tip of mainland India, known for its unique confluence of three seas, temples, Vivekananda Rock Memorial, and local cultural experiences.

User's Viewing History:
{{#if viewingHistory}}
{{#each viewingHistory}}- {{this}}
{{/each}}
{{else}}No viewing history provided.
{{/if}}

User's Preferences:
{{#if preferences}}
{{#each preferences}}- {{this}}
{{/each}}
{{else}}No specific preferences stated.
{{/if}}

Based on the above information, generate a list of 3-5 personalized recommendations for attractions or local experiences in Kanyakumari. For each recommendation, provide its name, a brief description, its category (e.g., "Historical Site", "Beach", "Cultural Experience", "Nature", "Religious Site"), and a clear reason why this recommendation is suitable for the user, linking it to their history or preferences.
Ensure the recommendations are diverse yet tailored to maximize user satisfaction.
`,
});

const aiPoweredRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPoweredRecommendationsFlow',
    inputSchema: AiPoweredRecommendationsInputSchema,
    outputSchema: AiPoweredRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await aiPoweredRecommendationsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate recommendations.');
    }
    return output;
  }
);
