import Link from "next/link";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  rightSlot?: React.ReactNode;
  className?: string;
}

export function SiteHeader({ rightSlot, className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity"
          aria-label="Polaris home"
        >
          <img
            src="/vercel.svg"
            alt=""
            className="size-8 sm:size-9"
          />
          <span className="text-xl font-semibold tracking-tight bg-linear-to-r from-violet-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
            Polaris
          </span>
        </Link>
        {rightSlot ? (
          <div className="flex items-center gap-2">{rightSlot}</div>
        ) : null}
      </div>
    </header>
  );
}
