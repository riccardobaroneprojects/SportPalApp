"use client";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Reusable helper component for the grid items to keep JSX clean
 */
export function FilterCard({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background/50 hover:bg-muted/50 cursor-pointer transition-colors">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
}
