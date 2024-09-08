import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isEnabled?: boolean;
}

export function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  isActive = false,
  isEnabled = true,
}: ToolbarButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="icon"
      onClick={onClick}
      disabled={!isEnabled}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
