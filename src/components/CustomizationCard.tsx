import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CustomizationCard() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    console.log('Saving character:', { name, description });
    // Implement save logic here
  };

  const handleFight = () => {
    console.log('Starting fight with character:', { name, description });
    // Implement fight logic here
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-2xl font-bold">Character customization</CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-32"
          />
        </div>
        <div className="border rounded-lg p-4">
          
          <div className="flex items-center justify-center h-48 bg-gray-100">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="30" r="20" fill="black" />
              <line x1="50" y1="50" x2="50" y2="80" stroke="black" strokeWidth="4" />
              <line x1="20" y1="60" x2="80" y2="60" stroke="black" strokeWidth="4" />
              <line x1="50" y1="80" x2="30" y2="100" stroke="black" strokeWidth="4" />
              <line x1="50" y1="80" x2="70" y2="100" stroke="black" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleFight} variant="secondary">Fight</Button>
      </CardFooter>
    </Card>
  );
}

