'use server';

/**
 * @fileOverview Provides AI-powered fashion styling advice, makeup looks, and accessory suggestions.
 *
 * - getStylingAdvice - A function that returns styling advice based on the input description.
 * - StylingAdviceInput - The input type for the getStylingAdvice function.
 * - StylingAdviceOutput - The return type for the getStylingAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StylingAdviceInputSchema = z.object({
  description: z.string().describe('A description of the desired style or occasion.'),
});
export type StylingAdviceInput = z.infer<typeof StylingAdviceInputSchema>;

const StylingAdviceOutputSchema = z.object({
  stylingAdvice: z.string().describe('AI-generated styling advice based on the input description.'),
  makeupSuggestions: z.string().describe('AI-generated makeup suggestions to match the style.'),
  accessorySuggestions: z.string().describe('AI-generated accessory suggestions to complement the outfit.'),
});
export type StylingAdviceOutput = z.infer<typeof StylingAdviceOutputSchema>;

export async function getStylingAdvice(input: StylingAdviceInput): Promise<StylingAdviceOutput> {
  return stylingAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'stylingAdvicePrompt',
  input: {schema: StylingAdviceInputSchema},
  output: {schema: StylingAdviceOutputSchema},
  prompt: `You are a personal AI fashion stylist. A user will describe the style or occasion they are dressing for.

You will suggest an outfit, makeup, and accessories to match the occasion.

Description: {{{description}}}

Output the stylingAdvice, makeupSuggestions, and accessorySuggestions as specified in the output schema.
`,
});

const stylingAdviceFlow = ai.defineFlow(
  {
    name: 'stylingAdviceFlow',
    inputSchema: StylingAdviceInputSchema,
    outputSchema: StylingAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
