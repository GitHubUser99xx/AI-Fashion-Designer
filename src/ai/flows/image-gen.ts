'use server';

/**
 * @fileOverview An AI agent for generating photorealistic fashion images from a text prompt.
 *
 * - generateFashionImage - A function that handles the image generation process.
 * - GenerateFashionImageInput - The input type for the generateFashionImage function.
 * - GenerateFashionImageOutput - The return type for the generateFashionImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFashionImageInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired fashion image.'),
});
export type GenerateFashionImageInput = z.infer<typeof GenerateFashionImageInputSchema>;

const GenerateFashionImageOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated fashion image as a data URI.'),
});
export type GenerateFashionImageOutput = z.infer<typeof GenerateFashionImageOutputSchema>;

export async function generateFashionImage(input: GenerateFashionImageInput): Promise<GenerateFashionImageOutput> {
  return generateFashionImageFlow(input);
}

const generateFashionImagePrompt = ai.definePrompt({
  name: 'generateFashionImagePrompt',
  input: {schema: GenerateFashionImageInputSchema},
  output: {schema: GenerateFashionImageOutputSchema},
  prompt: `Generate a photorealistic fashion image based on the following description: {{{prompt}}}.  Respond with a data URI of the generated image in the imageUrl field.`, 
});

const generateFashionImageFlow = ai.defineFlow(
  {
    name: 'generateFashionImageFlow',
    inputSchema: GenerateFashionImageInputSchema,
    outputSchema: GenerateFashionImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {imageUrl: media.url};
  }
);
