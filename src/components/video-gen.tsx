"use client";

import { useState, useTransition, useRef } from 'react';
import { Video, Sparkles, Upload } from 'lucide-react';

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
  const [prompt, setPrompt] = useState('Subtle zoom in, cinematic lighting');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(generatedImageUrl);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setVideoUrl(null);

    const finalImageDataUri = imageDataUri || generatedImageUrl;

    if (!finalImageDataUri) {
        setError("Please upload an image or generate one first.");
        toast({ title: "Image required", description: "Please upload an image or generate one first to create a video.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
      const result = await generateFashionVideoAction({ prompt, imageDataUri: finalImageDataUri });
      if (result.error) {
        setError(result.error);
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else if (result.data) {
        setVideoUrl(result.data.videoDataUri);
        toast({ title: "Success!", description: "Your video is ready." });
      }
    });
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Video className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">VideoGen</CardTitle>
            <CardDescription>Create short, stunning fashion videos from an image.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="e.g., cinematic zoom, sparkles effect"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isPending}
            className="text-base"
          />
          <div>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isPending} className="w-full">
              <Upload className="mr-2 h-4 w-4"/>
              {imageDataUri || generatedImageUrl ? 'Change Image' : 'Upload Base Image'}
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground mt-1">Uses the generated image by default if available.</p>
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isPending ? 'Generating Video...' : 'Generate Video'}
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
          ) : videoUrl ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              muted
              loop
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-center text-muted-foreground p-4">
                <Video className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2"/>
                Your generated video will appear here.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
