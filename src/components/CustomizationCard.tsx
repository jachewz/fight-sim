import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toolbar } from "./Toolbar";
import { Canvas } from "./Canvas";
import { Save } from "lucide-react";

import type { Character } from "@/lib/types";

export default function CustomizationCard({
  character,
  onSave,
}: {
  character: Character;
  onSave: (c: Character) => void;
}) {
  const [drawingName, setDrawingName] = useState(character.name);
  const [description, setDescription] = useState(character.description);
  const [tool, setTool] = useState("draw");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentImageData, setCurrentImageData] = useState<ImageData | null>(
    null
  );
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (history.length > 0) {
      setCurrentImageData(history[history.length - 1]);
    } else {
      setCurrentImageData(null);
    }
  }, [history]);

  useEffect(() => {
    if (ctx) {
      const image = new Image();
      image.src = character.image;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        setHistory([imageData]);
      };
    }
  }, [ctx, character.image]);

  const handleDraw = (imageData: ImageData) => {
    setHistory((prev) => [...prev, imageData]);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
    } else if (history.length === 1) {
      setHistory([]);
    }
  };

  const handleClear = () => {
    setHistory([]);
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  const handleSave = () => {
    if (ctx) {
      const imageData = ctx.canvas.toDataURL();
      const newCharacter: Character = {
        ...character,
        name: drawingName,
        description,
        image: imageData
      };

      onSave(newCharacter);
    } else {
      console.error("Canvas context not found while saving");
    }
  };

  return (
    <div className="flex gap-2 w-full max-w-5xl mx-auto p-4">
      <Toolbar
        tool={tool}
        color={color}
        size={size}
        onToolChange={setTool}
        onColorChange={setColor}
        onSizeChange={setSize}
        onUndo={handleUndo}
        onClear={handleClear}
      />
      <div className="flex-grow flex flex-col gap-4">
        <Card
          className="w-full bg-gradient-to-br aspect-[5/7] 
        from-primary/20 to-secondary/20 border-4 border-primary/50 rounded-xl overflow-clip"
        >
          <CardTitle className="text-center text-2xl font-bold text-primary px-2 pt-2">
            <Input
              type="text"
              placeholder="Drawing Name"
              maxLength={30}
              value={drawingName}
              onChange={(e) => setDrawingName(e.target.value)}
              className="text-center bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </CardTitle>
          <CardContent className="p-4 w-96 h-96">
            <div className="relative w-full h-full">
              <Canvas
                tool={tool}
                color={color}
                size={size}
                currentImageData={currentImageData}
                onDraw={handleDraw}
                setCtx={setCtx}
              />
            </div>
          </CardContent>
          <CardFooter className="px-4 pt-2">
            <Textarea
              placeholder="Add a description for your drawing..."
              value={description}
              maxLength={100}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
            />
          </CardFooter>
        </Card>
        <Button
          onClick={handleSave}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Drawing
        </Button>
      </div>
    </div>
  );
}
