"use client";

import { useState, useTransition, useRef } from 'react';
import Image from 'next/image';
import { Film, Sparkles, Upload } from 'lucide-react';

import { generateFashionVideoAction } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type VideoGenProps = {
  generatedImageUrl: string | null;
};

export default function VideoGen({ generatedImageUrl }: VideoGenProps) {
  const [prompt, setPrompt] = useState('A photorealistic image with cinematic lighting');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const activeImageDataUri = userUploadedImage || generatedImageUrl;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserUploadedImage(e.target?.result as string);
        setResultUrl(null); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResultUrl(null);

    if (!activeImageDataUri) {
        setError("Please upload an image or generate one first.");
        toast({ title: "Image required", description: "Please upload an image or generate one first to apply effects.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
      const result = await generateFashionVideoAction({ prompt, imageDataUri: activeImageDataUri });
      if (result.error) {
        setError(result.error);
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else if (result.data) {
        setResultUrl(result.data.videoDataUri);
        toast({ title: "Success!", description: "Your stylized image is ready." });
      }
    });
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Film className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">Image Effects</CardTitle>
            <CardDescription>Apply creative effects to an image using AI.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="e.g., cinematic lighting, vintage look..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isPending}
            className="text-base"
          />
          <div>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isPending} className="w-full">
              <Upload className="mr-2 h-4 w-4"/>
              {activeImageDataUri ? 'Change Base Image' : 'Upload Base Image'}
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground mt-1">Uses the image from ImageGen by default.</p>
          </div>
          <Button type="submit" disabled={isPending || !activeImageDataUri} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isPending ? 'Applying Effects...' : 'Generate Effects'}
          </Button>
        </form>

        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border bg-secondary/50 flex items-center justify-center">
          {isPending ? (
            <Skeleton className="w-full h-full" />
          ) : resultUrl ? (
            <Image
              src={resultUrl}
              alt={prompt}
              width={512}
              height={512}
              className="object-cover w-full h-full"
              data-ai-hint="fashion effect"
            />
          ) : activeImageDataUri ? (
             <Image
              src={activeImageDataUri}
              alt="Base image for effects"
              width={512}
              height={512}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-center text-muted-foreground p-4">
                <Film className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2"/>
                Your stylized image will appear here.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
