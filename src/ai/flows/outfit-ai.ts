'use server';

/**
 * @fileOverview An AI agent that suggests outfits from a user's virtual wardrobe based on the occasion.
 *
 * - suggestOutfit - A function that handles the outfit suggestion process.
 * - SuggestOutfitInput - The input type for the suggestOutfit function.
 * - SuggestOutfitOutput - The return type for the suggestOutfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOutfitInputSchema = z.object({
  occasion: z.string().describe('The occasion for which the outfit is needed (e.g., wedding, casual, work, party).'),
  wardrobe: z.array(z.string()).describe('The list of clothing items in the user\'s virtual wardrobe.'),
});
export type SuggestOutfitInput = z.infer<typeof SuggestOutfitInputSchema>;

const SuggestOutfitOutputSchema = z.object({
  outfitSuggestion: z.string().describe('A suggested outfit based on the occasion and wardrobe provided.'),
  reasoning: z.string().describe('The AI agent\'s reasoning for the outfit suggestion.'),
});
export type SuggestOutfitOutput = z.infer<typeof SuggestOutfitOutputSchema>;

export async function suggestOutfit(input: SuggestOutfitInput): Promise<SuggestOutfitOutput> {
  return suggestOutfitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOutfitPrompt',
  input: {schema: SuggestOutfitInputSchema},
  output: {schema: SuggestOutfitOutputSchema},
  prompt: `You are a personal fashion stylist. A user is requesting an outfit suggestion from their virtual wardrobe for a specific occasion.

  Occasion: {{{occasion}}}
  Wardrobe: {{#each wardrobe}}{{{this}}}, {{/each}}

  Based on the occasion and the items in the user's wardrobe, suggest a complete outfit and explain your reasoning for the choices made.
  Format your repsonse in a JSON format.
  Ensure the outfitSuggestion field contains the complete outfit, and the reasoning field explains the choices.
  `,
});

const suggestOutfitFlow = ai.defineFlow(
  {
    name: 'suggestOutfitFlow',
    inputSchema: SuggestOutfitInputSchema,
    outputSchema: SuggestOutfitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
