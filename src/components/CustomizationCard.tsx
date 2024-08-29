import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toolbar } from "./Toolbar";
import { Canvas } from "./Canvas";

export default function CustomizationCard() {
  const [drawingName, setDrawingName] = useState("Untitled Drawing");
  const [tool, setTool] = useState("draw");
  const [color, setColor] = useState("#000000");
  const [history, setHistory] = useState<ImageData[]>([]); // latest image data is last in array

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
  };

  const handleSave = () => {
    console.log(`Saving drawing: ${drawingName}`);
    console.log("Canvas data:", history[history.length - 1]);
    // Here you would typically send the data to a server or save it locally
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          <Input
            type="text"
            placeholder="Drawing Name"
            value={drawingName}
            onChange={(e) => setDrawingName(e.target.value)}
            className="text-lg font-bold"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div
          className="relative w-full"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <Toolbar
            tool={tool}
            color={color}
            onToolChange={setTool}
            onColorChange={setColor}
            onUndo={handleUndo}
            onClear={handleClear}
            onSave={handleSave}
          />
          <Canvas
            tool={tool}
            color={color}
            currentImageData={history[history.length - 1] || null}
            onDraw={handleDraw}
          />
        </div>
      </CardContent>
    </Card>
  );
}
