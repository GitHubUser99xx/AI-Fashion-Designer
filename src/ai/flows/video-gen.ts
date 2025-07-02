'use server';

/**
 * @fileOverview Video generation flow for creating short fashion videos from text prompts and images.
 *
 * - generateFashionVideo - A function to generate fashion videos.
 * - GenerateFashionVideoInput - The input type for the generateFashionVideo function.
 * - GenerateFashionVideoOutput - The return type for the generateFashionVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateFashionVideoInputSchema = z.object({
  prompt: z.string().describe('Text prompt describing the desired fashion video.'),
  imageDataUri: z
    .string()
    .describe(
      "A base64-encoded image to use as a base for the video.  Must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateFashionVideoInput = z.infer<typeof GenerateFashionVideoInputSchema>;

const GenerateFashionVideoOutputSchema = z.object({
  videoDataUri: z.string().describe('The generated fashion video as a data URI.'),
});
export type GenerateFashionVideoOutput = z.infer<typeof GenerateFashionVideoOutputSchema>;

export async function generateFashionVideo(input: GenerateFashionVideoInput): Promise<GenerateFashionVideoOutput> {
  return generateFashionVideoFlow(input);
}

const generateFashionVideoFlow = ai.defineFlow(
  {
    name: 'generateFashionVideoFlow',
    inputSchema: GenerateFashionVideoInputSchema,
    outputSchema: GenerateFashionVideoOutputSchema,
  },
  async input => {
    // Ensure imageDataUri is provided, else the model throws an error.
    if (!input.imageDataUri) {
      throw new Error('Image data URI is required.');
    }

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.imageDataUri}},
        {text: input.prompt},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    if (!media?.url) {
      throw new Error('Failed to generate video.');
    }

    return {videoDataUri: media.url};
  }
);
