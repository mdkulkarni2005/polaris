"use client";

import { cn } from "@/lib/utils";
import type { StackOption } from "../constants/stack-options";
import { HelpCircleIcon } from "lucide-react";

interface StackOptionSelectorProps {
  title: string;
  options: StackOption[];
  selectedId: string;
  onSelect: (option: StackOption) => void;
  className?: string;
}

export function StackOptionSelector({
  title,
  options,
  selectedId,
  onSelect,
  className,
}: StackOptionSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card/50 text-muted-foreground hover:border-border hover:bg-accent/30 hover:text-foreground"
              )}
            >
              {option.logoUrl ? (
                <img
                  src={option.logoUrl}
                  alt=""
                  className="size-5 shrink-0 object-contain"
                  width={20}
                  height={20}
                />
              ) : (
                <span className="flex size-5 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                  <HelpCircleIcon className="size-3" />
                </span>
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
