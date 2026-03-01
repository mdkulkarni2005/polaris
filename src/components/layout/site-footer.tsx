import Link from "next/link";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "w-full border-t border-border/50 bg-background/50 mt-auto",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Polaris. Your autonomous AI software engineer.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground"
            aria-label="Footer"
          >
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted-foreground/70">·</span>
            <span className="text-muted-foreground/70">Build with AI</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
