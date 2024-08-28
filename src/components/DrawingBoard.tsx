import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';

export const DrawingBoard = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [brushColor, setBrushColor] = useState('red');
  const [brushSize, setBrushSize] = useState(2);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    if (!canvasEl.current) return;

    const canvas = new fabric.Canvas(canvasEl.current, {
      selectionColor: 'rgba(101, 204, 138, 0.3)',
      enableRetinaScaling: true,
      backgroundColor: 'white',
      width: 500,
      height: 500,
    });

    const pencilBrush = new fabric.PencilBrush(canvas);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = pencilBrush;

      if (isEraser) {
        canvas.freeDrawingBrush.color = 'white';
      } else {
        canvas.freeDrawingBrush.color = brushColor;
      }
      canvas.freeDrawingBrush.width = brushSize;

    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      offsetX: 0,
      offsetY: 0,
      color: 'green',
    });

    // make the fabric.Canvas instance available to your app
    // updateCanvasContext(canvas);

    return () => {
      //  updateCanvasContext(null);
      canvas.dispose();
    };
  }, [brushColor, brushSize, isEraser]);

  return (
    <div>
      <canvas ref={canvasEl} className='z-1'/>
      <div className="flex gap-2 z-10">
        <Button onClick={() => setIsEraser(!isEraser)}>
          {isEraser ? 'Switch to Brush' : 'Switch to Eraser'}
        </Button>
        <Button onClick={() => setBrushColor('red')}>Red</Button>
        <Button onClick={() => setBrushColor('blue')}>Blue</Button>
        <Button onClick={() => setBrushColor('green')}>Green</Button>
        <Button onClick={() => setBrushSize(2)}>Small</Button>
        <Button onClick={() => setBrushSize(5)}>Medium</Button>
        <Button onClick={() => setBrushSize(10)}>Large</Button>
      </div>
    </div>
  );
};