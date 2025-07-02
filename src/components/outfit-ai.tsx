"use client";

import { useState, useTransition } from 'react';
import { Shirt, Sparkles } from 'lucide-react';

import { suggestOutfitAction } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type OutfitAIProps = {
  wardrobe: string[];
};

type OutfitSuggestion = {
  outfitSuggestion: string;
  reasoning: string;
};

export default function OutfitAI({ wardrobe }: OutfitAIProps) {
  const [occasion, setOccasion] = useState('summer wedding guest');
  const [suggestion, setSuggestion] = useState<OutfitSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuggestion(null);

    startTransition(async () => {
      const result = await suggestOutfitAction({ occasion, wardrobe });
      if (result.error) {
        setError(result.error);
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else if (result.data) {
        setSuggestion(result.data);
        toast({ title: "Success!", description: "Your outfit suggestion is ready." });
      }
    });
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Shirt className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">OutfitAI</CardTitle>
            <CardDescription>Get outfit ideas from your wardrobe for any occasion.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="e.g., formal dinner, beach party"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            disabled={isPending}
            className="text-base"
          />
          <Button type="submit" disabled={isPending || wardrobe.length === 0} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isPending ? 'Finding Outfit...' : 'Suggest Outfit'}
          </Button>
          {wardrobe.length === 0 && <p className="text-xs text-destructive text-center">Add items to your wardrobe first!</p>}
        </form>

        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <div className="mt-4 space-y-4">
          {isPending ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : suggestion && (
            <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-headline text-lg font-semibold mb-2">Suggestion:</h4>
                <p className="font-body text-base">{suggestion.outfitSuggestion}</p>
                <h4 className="font-headline text-lg font-semibold mt-4 mb-2">Reasoning:</h4>
                <p className="font-body text-sm text-muted-foreground">{suggestion.reasoning}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
