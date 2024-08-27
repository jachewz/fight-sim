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
            {/* <canvas width="100" height="100">
                
            </canvas> */}
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

