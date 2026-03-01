"use client";

import { SparkleIcon } from "lucide-react";
import { Code2Icon, GlobeIcon, ServerIcon, LayoutIcon } from "lucide-react";

export const EXAMPLE_PROMPTS = [
  {
    title: "Next.js app",
    description: "Full-stack app with API routes and React",
    prompt: "Create a Next.js 14 app with App Router, a simple dashboard page, and an API route that returns JSON. Use TypeScript and Tailwind CSS.",
    icon: Code2Icon,
  },
  {
    title: "React + Vite",
    description: "Single-page app with Vite",
    prompt: "Scaffold a React 18 + TypeScript project with Vite. Include a main App with a header and a counter component using useState.",
  },
  {
    title: "FastAPI backend",
    description: "REST API with Python",
    prompt: "Create a FastAPI project with a few REST endpoints: GET /health, GET /items, POST /items. Use Pydantic models and include a requirements.txt.",
    icon: ServerIcon,
  },
  {
    title: "Landing page",
    description: "Marketing page with sections",
    prompt: "Build a one-page marketing landing with a hero, features grid, and footer. Use plain HTML/CSS or React with Tailwind. Make it responsive.",
    icon: LayoutIcon,
  },
  {
    title: "Express API",
    description: "Node.js REST server",
    prompt: "Set up an Express.js server with TypeScript. Add routes GET / and GET /api/users returning mock JSON. Include package.json and tsconfig.",
    icon: ServerIcon,
  },
  {
    title: "CLI tool",
    description: "Command-line app",
    prompt: "Create a small Node.js CLI tool that accepts a name argument and prints a greeting. Use commander or yargs and TypeScript.",
    icon: GlobeIcon,
  },
] as const;

interface ExampleProjectsProps {
  onSelectExample: (prompt: string) => void;
}

export function ExampleProjects({ onSelectExample }: ExampleProjectsProps) {
  return (
    <section
      className="rounded-xl border border-border/80 bg-card/40 p-4"
      aria-labelledby="example-projects-heading"
    >
      <h2
        id="example-projects-heading"
        className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"
      >
        <SparkleIcon className="size-4 text-muted-foreground" />
        Try an example
      </h2>
      <p className="text-xs text-muted-foreground mb-3">
        Start from a prompt—Polaris will scaffold the project.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {EXAMPLE_PROMPTS.map((example) => {
          const Icon = example.icon ?? Code2Icon;
          return (
            <button
              key={example.title}
              type="button"
              onClick={() => onSelectExample(example.prompt)}
              className="flex items-start gap-2 rounded-lg border border-border/60 bg-background/50 p-3 text-left transition-colors hover:border-border hover:bg-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {example.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {example.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
