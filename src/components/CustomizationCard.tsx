import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { DrawingBoard } from '@/components/DrawingBoard';

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

  const handleClear = () => {
    console.log('Clearing canvas');
    
  }

  return (
    <Card className="">
      <CardHeader className="text-2xl font-bold">Character customization</CardHeader>
      <CardContent className="gap-4">
        <div className="space-y-4">
          <div className="border rounded-lg">
            <DrawingBoard />
            <Button onClick={handleClear}>Clear</Button>
          </div>
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
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleFight} variant="secondary">Fight</Button>
      </CardFooter>
    </Card>
  );
}

