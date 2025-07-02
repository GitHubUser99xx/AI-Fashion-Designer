 "use server";

import { generateFashionImage as generateFashionImageFlow, type GenerateFashionImageInput } from "@/ai/flows/image-gen";
import { generateFashionVideo as generateFashionVideoFlow, type GenerateFashionVideoInput } from "@/ai/flows/video-gen";
import { suggestOutfit as suggestOutfitFlow, type SuggestOutfitInput } from "@/ai/flows/outfit-ai";
import { getStylingAdvice as getStylingAdviceFlow, type StylingAdviceInput } from "@/ai/flows/style-ai";
import { z } from "zod";

const imageGenSchema = z.object({
    prompt: z.string().min(3, "Prompt must be at least 3 characters long."),
});

export async function generateFashionImageAction(input: GenerateFashionImageInput) {
    const parsed = imageGenSchema.safeParse(input);
    if (!parsed.success) {
        return { error: parsed.error.errors.map(e => e.message).join(', ') };
    }
    try {
        const result = await generateFashionImageFlow(parsed.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        return { error: "Failed to generate image. Please try again." };
    }
}

const videoGenSchema = z.object({
    prompt: z.string().min(3, "Prompt must be at least 3 characters long."),
    imageDataUri: z.string().startsWith("data:image/", "Invalid image data URI."),
});

export async function generateFashionVideoAction(input: GenerateFashionVideoInput) {
    const parsed = videoGenSchema.safeParse(input);
    if (!parsed.success) {
        return { error: parsed.error.errors.map(e => e.message).join(', ') };
    }
    try {
        const result = await generateFashionVideoFlow(parsed.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        return { error: "Failed to generate video. Please try again." };
    }
}


const outfitAISchema = z.object({
    occasion: z.string().min(3, "Occasion must be at least 3 characters long."),
    wardrobe: z.array(z.string()).min(1, "Wardrobe cannot be empty."),
});

export async function suggestOutfitAction(input: SuggestOutfitInput) {
    const parsed = outfitAISchema.safeParse(input);
    if (!parsed.success) {
        return { error: parsed.error.errors.map(e => e.message).join(', ') };
    }
    try {
        const result = await suggestOutfitFlow(parsed.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        return { error: "Failed to suggest outfit. Please try again." };
    }
}

const styleAISchema = z.object({
    description: z.string().min(10, "Description must be at least 10 characters long."),
});

export async function getStylingAdviceAction(input: StylingAdviceInput) {
    const parsed = styleAISchema.safeParse(input);
    if (!parsed.success) {
        return { error: parsed.error.errors.map(e => e.message).join(', ') };
    }
    try {
        const result = await getStylingAdviceFlow(parsed.data);
        return { data: result };
    } catch (e) {
        console.error(e);
        return { error: "Failed to get styling advice. Please try again." };
    }
}
