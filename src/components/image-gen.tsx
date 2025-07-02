"use client";

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Dna, Sparkles } from 'lucide-react';

import { generateFashionImageAction } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type ImageGenProps = {
  setGeneratedImageUrl: (url: string | null) => void;
};

export default function ImageGen({ setGeneratedImageUrl }: ImageGenProps) {
  const [prompt, setPrompt] = useState('A high-fashion model wearing a futuristic chrome dress on a runway in Tokyo');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setImageUrl(null);
    setGeneratedImageUrl(null);

    startTransition(async () => {
      const result = await generateFashionImageAction({ prompt });
      if (result.error) {
        setError(result.error);
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.data) {
        setImageUrl(result.data.imageUrl);
        setGeneratedImageUrl(result.data.imageUrl);
        toast({
          title: "Success!",
          description: "Your image has been generated.",
        });
      }
    });
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Dna className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">ImageGen</CardTitle>
            <CardDescription>Generate photorealistic fashion images with AI.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="e.g., a wedding dress with lace..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isPending}
            className="text-base"
          />
          <Button type="submit" disabled={isPending} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isPending ? 'Generating...' : 'Generate Image'}
          </Button>
        </form>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-4 aspect-square w-full rounded-lg overflow-hidden border bg-secondary/50 flex items-center justify-center">
          {isPending ? (
            <Skeleton className="w-full h-full" />
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={prompt}
              width={512}
              height={512}
              className="object-cover w-full h-full"
              data-ai-hint="fashion model"
            />
          ) : (
             <div className="text-center text-muted-foreground p-4">
                <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2"/>
                Your generated image will appear here.
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
