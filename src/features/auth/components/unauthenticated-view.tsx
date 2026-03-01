import {
  Code2Icon,
  FileCodeIcon,
  FolderTreeIcon,
  SparklesIcon,
} from "lucide-react";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LandingCharts } from "./landing-charts";
import { ProductSamplesTabs } from "./product-samples-tabs";
import { PricingSection } from "./pricing-section";

const features = [
  {
    icon: Code2Icon,
    title: "AI software engineer",
    description:
      "Polaris scaffolds, modifies, and organizes real project files using tools—no raw code dumps in chat.",
    color: "violet",
  },
  {
    icon: FolderTreeIcon,
    title: "Complete project scaffolding",
    description:
      "Get production-ready structure in one pass: package configs, entry points, source layout, and scripts.",
    color: "blue",
  },
  {
    icon: FileCodeIcon,
    title: "Framework-aware",
    description:
      "Works with React, Next.js, Vite, Express, FastAPI, Django, NestJS, and more—detected automatically.",
    color: "cyan",
  },
  {
    icon: SparklesIcon,
    title: "Tool-first workflow",
    description:
      "Lists files, creates folders and files in batches, and verifies structure—never guesses, always correct.",
    color: "amber",
  },
];

const featureColorClasses = {
  violet: {
    iconBg: "bg-violet-500/15",
    iconText: "text-violet-400",
    borderHover: "hover:border-violet-500/40",
    glow: "group-hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.25)]",
  },
  blue: {
    iconBg: "bg-blue-500/15",
    iconText: "text-blue-400",
    borderHover: "hover:border-blue-500/40",
    glow: "group-hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.25)]",
  },
  cyan: {
    iconBg: "bg-cyan-500/15",
    iconText: "text-cyan-400",
    borderHover: "hover:border-cyan-500/40",
    glow: "group-hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.25)]",
  },
  amber: {
    iconBg: "bg-amber-500/15",
    iconText: "text-amber-400",
    borderHover: "hover:border-amber-500/40",
    glow: "group-hover:shadow-[0_0_24px_-4px_rgba(245,158,11,0.25)]",
  },
};

export const UnathenticatedView = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader
        rightSlot={
          <>
            <SignInButton>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm" className="bg-violet-600 text-white hover:bg-violet-500">
                Get started
              </Button>
            </SignUpButton>
          </>
        }
      />

      {/* Colored gradient orbs behind hero */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
      >
        <div className="absolute -top-1/2 left-1/2 h-[85vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-[60vh] w-[60vw] rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute top-1/2 left-0 h-[40vh] w-[40vw] rounded-full bg-blue-500/10 blur-[80px]" />
      </div>

      <main className="relative z-10 flex-1 mx-auto w-full max-w-4xl px-6 pb-16 pt-10 sm:px-8">
        {/* Hero */}
        <header className="text-center" role="banner">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-linear-to-r from-violet-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
              Polaris
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Your autonomous AI software engineer. Describe what you want—Polaris
            builds the project.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <SignUpButton>
              <Button
                size="lg"
                className="min-w-[140px] bg-violet-600 text-white hover:bg-violet-500 focus-visible:ring-violet-500/50"
              >
                Get started
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[140px] border-violet-500/40 text-violet-300 hover:bg-violet-500/15 hover:text-violet-200 hover:border-violet-400/50"
              >
                Sign in
              </Button>
            </SignInButton>
          </div>
        </header>

        {/* What this app does */}
        <section className="mt-20" aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-center text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
          >
            What Polaris does
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            One place to go from idea to a real, runnable codebase—without
            copy-pasting blocks of code.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description, color }) => {
              const c = featureColorClasses[color];
              return (
                <li
                  key={title}
                  className={`group rounded-xl border border-border/80 bg-card/50 p-6 text-card-foreground shadow-sm transition-all duration-200 hover:bg-card/80 ${c.borderHover} ${c.glow}`}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${c.iconBg} ${c.iconText}`}
                  >
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Sub-tabs: product samples (Claude Code style) */}
        <ProductSamplesTabs />

        {/* Charts */}
        <LandingCharts />

        {/* Pricing */}
        <PricingSection />

        {/* Bottom CTA */}
        <section className="mt-20 rounded-2xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 via-transparent to-cyan-500/10 p-8 text-center sm:p-10">
          <p className="text-lg font-medium text-foreground">
            Ready to build with Polaris?
          </p>
          <p className="mt-1 text-muted-foreground">
            Sign in or create an account to start.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <SignUpButton>
              <Button
                size="lg"
                className="bg-violet-600 text-white hover:bg-violet-500 focus-visible:ring-violet-500/50"
              >
                Create account
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button
                size="lg"
                variant="outline"
                className="border-violet-500/40 text-violet-300 hover:bg-violet-500/15 hover:text-violet-200 hover:border-violet-400/50"
              >
                Sign in
              </Button>
            </SignInButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};
