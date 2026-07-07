"use client";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Reusable helper component for the grid items to keep JSX clean
 */
export function FilterCard({
  label,
  checked,
  onCheckedChange,
  className = "",
}: {
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
  className?: string; // Added to pass grid positioning like last:col-span-2 easily
}) {
  return (
    <label
      className={`flex items-center gap-3 p-3 px-4 rounded-full border transition-all cursor-pointer select-none text-sm font-medium ${
        checked
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card border-border text-foreground active:bg-accent/10 hover:bg-muted/30"
      } ${className}`}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`h-4 w-4 transition-colors ${
          checked
            ? "border-primary-foreground bg-primary-foreground text-primary data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
            : "border-muted-foreground/50" // Gives unselected state better contrast visibility
        }`}
      />
      <span className="capitalize">{label}</span>
    </label>
  );
}
