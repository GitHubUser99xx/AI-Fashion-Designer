"use client";

import { Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

// A simple SVG for TikTok icon
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11.96 13.15a2.78 2.78 0 1 0-2.28 2.28v-5.6h2.28Z"/>
        <path d="M11.96 8.52a4.78 4.78 0 1 1-4.78-4.78 4.78 4.78 0 0 1 4.78 4.78v5.81"/>
        <path d="M14.24 18.73a4.78 4.78 0 1 1 4.78-4.78v-1.18a2.78 2.78 0 0 0-2.5-2.78"/>
    </svg>
);

// A simple SVG for Instagram icon
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);


export default function SocialShare() {
    const { toast } = useToast();

    const handleShare = (platform: string) => {
        toast({
            title: `Sharing to ${platform}`,
            description: "This is a demo. In a real app, this would trigger the social media API.",
        });
    };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Share2 className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">Social Share</CardTitle>
            <CardDescription>Share your creations with the world.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 items-center justify-center">
        <Button onClick={() => handleShare('Instagram')} variant="outline" className="flex items-center gap-2">
            <InstagramIcon className="w-5 h-5" />
            Share on Instagram
        </Button>
        <Button onClick={() => handleShare('TikTok')} variant="outline" className="flex items-center gap-2">
            <TikTokIcon className="w-5 h-5" />
            Share on TikTok
        </Button>
        <Button onClick={() => handleShare('Pinterest')} variant="outline" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.084-.399-.028-1.01.232-1.48C8.956 19.14 10 18 10 18s-.5-2-.6-2.8c-.1-.8.5-1.4.5-1.4s1.2-5 1.2-5c.3-1 .2-2-.5-2-.8 0-1.5.8-1.5 1.8 0 1.1-.7 2.8-.7 2.8s-.3 1.3-1.5 1.3c-1.8 0-3-2.3-3-4.5 0-3.3 2.4-6 6-6 3.3 0 5.5 2.5 5.5 5.2 0 3.3-2 5.8-2 5.8s-1.2 5-1.5 6c-.2 1.3.8 2.5.8 2.5s2.5.3 3.3-1.5c.8-1.8 1.8-5.5 1.8-5.5s.8-3.3.8-4.5c0-4.5-4-8-8-8z"/></svg>
            Share on Pinterest
        </Button>
      </CardContent>
    </Card>
  );
}
