import { Paintbrush, Eraser, Undo2, Trash2, Save } from "lucide-react";
import { ToolbarButton } from "@/components/ToolbarButton";
import { BrushButton } from "@/components/BrushButton";

interface ToolbarProps {
  tool: string;
  color: string;
  onToolChange: (tool: string) => void;
  onColorChange: (color: string) => void;
  onUndo: () => void;
  onClear: () => void;
  onSave: () => void;
}

export function Toolbar({
  tool,
  color,
  onToolChange,
  onColorChange,
  onUndo,
  onClear,
  onSave,
}: ToolbarProps) {
  return (
    <div className="absolute top-0 left-0 z-10 flex w-full items-center justify-center space-x-2 bg-background/80 p-2 backdrop-blur-sm">
      <ToolbarButton
        icon={Paintbrush}
        label="Draw"
        onClick={() => onToolChange("draw")}
        isActive={tool === "draw"}
      />
      <ToolbarButton
        icon={Eraser}
        label="Erase"
        onClick={() => onToolChange("erase")}
        isActive={tool === "erase"}
      />
      <ToolbarButton icon={Undo2} label="Undo" onClick={onUndo} />
      <ToolbarButton icon={Trash2} label="Clear" onClick={onClear} />
      <BrushButton
        onClick={() => onToolChange("draw")}
        isActive={tool === "draw"}
        color={color}
        onColorSelect={onColorChange} />
      <ToolbarButton icon={Save} label="Save" onClick={onSave} />
    </div>
  );
}
