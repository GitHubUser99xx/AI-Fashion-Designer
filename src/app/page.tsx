"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dna, Shirt, Video, BotMessageSquare, Share2, PlusCircle, Trash2 } from 'lucide-react';

import SplashScreen from '@/components/splash-screen';
import ImageGen from '@/components/image-gen';
import VideoGen from '@/components/video-gen';
import StyleAI from '@/components/style-ai';
import OutfitAI from '@/components/outfit-ai';
import WardrobeManager from '@/components/wardrobe-manager';
import SocialShare from '@/components/social-share';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [wardrobe, setWardrobe] = useState<string[]>([
    "black dress",
    "blue jeans",
    "white t-shirt",
    "brown boots",
  ]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  if (!showApp) {
    return <SplashScreen onContinue={() => setShowApp(true)} />;
  }

  return (
    <>
      <main className="min-h-screen bg-background p-4 md:p-8">
        <header className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">RunwayAI</h1>
          <p className="text-muted-foreground mt-2 text-lg">Your Virtual AI Fashion Stylist</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <ImageGen setGeneratedImageUrl={setGeneratedImageUrl} />
            <VideoGen generatedImageUrl={generatedImageUrl} />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <WardrobeManager wardrobe={wardrobe} setWardrobe={setWardrobe} />
            <OutfitAI wardrobe={wardrobe} />
          </div>

          <div className="lg:col-span-3">
             <StyleAI />
          </div>
          
          <div className="lg:col-span-3">
            <SocialShare />
          </div>

        </div>
      </main>
    </>
  );
}
