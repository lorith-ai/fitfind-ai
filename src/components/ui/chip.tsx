import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: "default" | "success" | "warning";
  size?: "sm" | "md";
}

export function Chip({ label, onRemove, variant = "default", size = "md" }: ChipProps) {
  const variants = {
    default: "bg-muted text-muted-foreground border-border",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1 rounded-full border transition-all",
      variants[variant],
      sizes[size]
    )}>
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-background/20 rounded-full p-0.5 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}