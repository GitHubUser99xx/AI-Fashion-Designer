"use client";

import { useState } from 'react';
import { PlusCircle, Trash2, Shirt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type WardrobeManagerProps = {
  wardrobe: string[];
  setWardrobe: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function WardrobeManager({ wardrobe, setWardrobe }: WardrobeManagerProps) {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() && !wardrobe.includes(newItem.trim())) {
      setWardrobe([...wardrobe, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setWardrobe(wardrobe.filter((item) => item !== itemToRemove));
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Shirt className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">Virtual Closet</CardTitle>
            <CardDescription>Manage your clothing items for outfit suggestions.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
          <Input
            placeholder="e.g., white sneakers"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="text-base"
          />
          <Button type="submit" size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </form>
        <Separator className="mb-4" />
        <ScrollArea className="h-48">
          {wardrobe.length > 0 ? (
            <ul className="space-y-2 pr-4">
              {wardrobe.map((item, index) => (
                <li key={index} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md animate-fade-in-up">
                  <span className="capitalize font-body">{item}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground pt-4">Your wardrobe is empty. Add some items!</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

const styles = `
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
