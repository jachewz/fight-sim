import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paintbrush } from 'lucide-react'
import { cn } from "@/lib/utils"

export function BrushButton({
  color,
onColorSelect,
  onClick,
}: {
  color: string
  onColorSelect: (color: string) => void
  onClick: () => void
}) {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ]

  const handleColorChange = (color: string) => {
    onColorSelect(color)
    onClick()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            ' ',
            !color && 'text-muted-foreground',
          )}
        >

            {color ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ color }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
              onClick={() => handleColorChange(s)}
            />
          ))}
        </div>
        <Input
          id="custom"
          value={color}
          className="col-span-2 h-8"
          onChange={(e) => handleColorChange(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}