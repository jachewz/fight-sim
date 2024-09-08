import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function BrushButton({
  color,
  size,
  onColorSelect,
  onSizeSelect,
  onClick,
  isActive,
}: {
  color: string;
  size: number;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: number) => void;
  onClick: () => void;
  isActive: boolean;
}) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#000000",
  ];

  const brushSizes = [2, 5, 10];

  const handleColorChange = (color: string) => {
    onColorSelect(color);
    onClick();
  };

  const handleSizeChange = (size: number) => {
    onSizeSelect(size);
    onClick();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={isActive ? "default" : "outline"}
          size="icon"
          className={cn("", !color && "text-muted-foreground")}
        >
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <span className="sr-only">Choose brush color and size</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {solids.map((s) => (
            <div
              key={s}
              style={{ backgroundColor: s }}
              className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
              onClick={() => handleColorChange(s)}
            />
          ))}
        </div>
        <Input
          id="custom"
          value={color}
          className="col-span-2 h-8 mb-4"
          onChange={(e) => handleColorChange(e.currentTarget.value)}
        />
        <div className="flex justify-between px-6">
          {brushSizes.map((s) => (
            <Button
              key={s}
              variant={size === s ? "default" : "outline"}
              onClick={() => handleSizeChange(s)}
            >
              <div
                className="rounded-full bg-foreground"
                style={{
                  width: `${s}px`,
                  height: `${s}px`,
                }}
              />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
