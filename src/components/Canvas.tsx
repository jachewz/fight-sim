import React, { useRef, useEffect, useState } from "react";

interface CanvasProps {
  tool: string;
  color: string;
  size: number;
  currentImageData: ImageData | null;
  onDraw: (imageData: ImageData) => void;
}

export function Canvas({
  tool,
  color,
  size,
  currentImageData,
  onDraw,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
        context.lineJoin = "round";
        setCtx(context);
      }
    }
  }, []);

  useEffect(() => {
    if (ctx && currentImageData) {
      ctx.putImageData(currentImageData, 0, 0);
    } else if (ctx && !currentImageData) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, [ctx, currentImageData]);

  useEffect(() => {
    if (ctx) {
      ctx.lineWidth = size;
      if (tool === "draw") {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
      } else if (tool === "erase") {
        ctx.globalCompositeOperation = "destination-out";
      }
    }
  }, [tool, color, size, ctx]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx || !canvasRef.current) return;
    setIsDrawing(false);
    ctx.closePath();
    onDraw(
      ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    );
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
