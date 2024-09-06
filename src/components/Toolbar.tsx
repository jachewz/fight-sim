import { Eraser, Undo2, Trash2, BookOpen, Save } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";
import { BrushButton } from "./BrushButton";

interface ToolbarProps {
  isLoggedIn: boolean;
  tool: string;
  color: string;
  size: number;
  onToolChange: (tool: string) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onUndo: () => void;
  onClear: () => void;
  onOpen: () => void;
  onSave: () => void;
}

export function Toolbar({
  isLoggedIn,
  tool,
  color,
  size,
  onToolChange,
  onColorChange,
  onSizeChange,
  onUndo,
  onClear,
  onOpen,
  onSave,
}: ToolbarProps) {
  return (
    <div className="flex flex-col items-center space-y-4 bg-background/80 p-4 rounded-lg backdrop-blur-sm">
      <BrushButton
        color={color}
        size={size}
        onColorSelect={onColorChange}
        onSizeSelect={onSizeChange}
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
      {isLoggedIn && (
        <>
          <ToolbarButton icon={BookOpen} label="Open" onClick={onOpen} />
          <ToolbarButton icon={Save} label="Save" onClick={onSave} />
        </>
      )}
    </div>
  );
}
