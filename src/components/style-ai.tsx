"use client";

import { useState, useTransition } from 'react';
import { BotMessageSquare, Sparkles } from 'lucide-react';

import { getStylingAdviceAction } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type StylingAdvice = {
  stylingAdvice: string;
  makeupSuggestions: string;
  accessorySuggestions: string;
};

export default function StyleAI() {
  const [description, setDescription] = useState('A casual day out in the city during autumn.');
  const [advice, setAdvice] = useState<StylingAdvice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setAdvice(null);

    startTransition(async () => {
      const result = await getStylingAdviceAction({ description });
      if (result.error) {
        setError(result.error);
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else if (result.data) {
        setAdvice(result.data);
        toast({ title: "Success!", description: "Your style advice is ready." });
      }
    });
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BotMessageSquare className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">StyleAI Assistant</CardTitle>
            <CardDescription>Get personalized styling, makeup, and accessory advice.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Describe the occasion, your style, or an item you want to style..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
            rows={3}
            className="text-base"
          />
          <Button type="submit" disabled={isPending} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isPending ? 'Getting Advice...' : 'Get Style Advice'}
          </Button>
        </form>
        
        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <div className="mt-4 space-y-2">
            {isPending && (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
            )}
            {advice && (
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-headline text-lg">Styling Advice</AccordionTrigger>
                        <AccordionContent className="text-base font-body">{advice.stylingAdvice}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-headline text-lg">Makeup Suggestions</AccordionTrigger>
                        <AccordionContent className="text-base font-body">{advice.makeupSuggestions}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-headline text-lg">Accessory Suggestions</AccordionTrigger>
                        <AccordionContent className="text-base font-body">{advice.accessorySuggestions}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
