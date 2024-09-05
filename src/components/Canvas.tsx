import React, { useRef, useEffect, useState } from "react";

interface CanvasProps {
  tool: string;
  color: string;
  size: number;
  currentImageData: ImageData | null;
  onDraw: (imageData: ImageData) => void;
  setCtx: React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>;
}

export function Canvas({
  tool,
  color,
  size,
  currentImageData,
  onDraw,
  setCtx,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (context) {
        context.lineCap = "round";
        context.lineJoin = "round";
        setCtx(context);
      }
    }
  }, [setCtx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        if (currentImageData) {
          context.putImageData(currentImageData, 0, 0);
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, [currentImageData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.lineWidth = size;
        if (tool === "draw") {
          context.globalCompositeOperation = "source-over";
          context.strokeStyle = color;
        } else if (tool === "erase") {
          context.globalCompositeOperation = "destination-out";
        }
      }
    }
  }, [tool, color, size]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
    onDraw(context.getImageData(0, 0, canvas.width, canvas.height));
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      className="w-full h-full cursor-crosshair bg-white rounded-lg"
    />
  );
}
