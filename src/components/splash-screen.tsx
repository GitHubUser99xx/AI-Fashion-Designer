"use client";

import { Button } from '@/components/ui/button';

type SplashScreenProps = {
  onContinue: () => void;
};

export default function SplashScreen({ onContinue }: SplashScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/80 via-background to-background text-foreground px-6 text-center">
      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-headline font-extrabold mb-4 drop-shadow-lg text-primary animate-fade-in-down">
          RunwayAI
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground drop-shadow-md animate-fade-in-up">
          Design, generate, and share stunning fashion looks powered by AI. Your personal stylist awaits.
        </p>
        <Button
          onClick={onContinue}
          size="lg"
          className="font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/40 transition-all transform hover:scale-105 active:scale-100 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Get Started
        </Button>
      </div>
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom mask-gradient" />
    </div>
  );
}

const styles = `
.mask-gradient {
  mask-image: linear-gradient(to bottom, transparent, black, black);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black, black);
}
@keyframes fade-in-down {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
