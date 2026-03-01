"use client";

import {
  Sparkles,
  Github,
  Code2,
  FileCode,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const samples = [
  {
    id: "describe",
    label: "Describe & build",
    icon: Sparkles,
    content: (
      <div className="rounded-lg border border-border/60 bg-card/40 p-4 font-mono text-sm">
        <div className="space-y-3">
          <div className="rounded-md bg-muted/50 px-3 py-2 text-muted-foreground">
            <span className="text-foreground/80">&gt;</span> Create a Next.js app
            with a dashboard and an API route that returns JSON.
          </div>
          <div className="flex gap-2">
            <span className="text-violet-400">Polaris</span>
            <span className="text-muted-foreground">—</span>
          </div>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Scaffolding Next.js 14 with App Router and TypeScript.</li>
            <li>Adding <code className="rounded bg-muted px-1">/dashboard</code> page and layout.</li>
            <li>Creating <code className="rounded bg-muted px-1">/api/hello</code> route.</li>
            <li>Writing package.json, tsconfig, and tailwind config.</li>
          </ul>
          <p className="pt-2 text-foreground/90">
            Done. Open the project and run <code className="rounded bg-muted px-1">npm run dev</code>.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "import",
    label: "Import from GitHub",
    icon: Github,
    content: (
      <div className="rounded-lg border border-border/60 bg-card/40 p-4 font-mono text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground/90">
            <Github className="size-4 text-muted-foreground" />
            <span>github.com/your-org/your-repo</span>
          </div>
          <div className="border-t border-border/50 pt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Imported structure
            </p>
            <ul className="space-y-1 text-muted-foreground">
              {["src/", "package.json", "README.md", "src/app/", "src/components/"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <FileCode className="size-3.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 pt-2 text-emerald-500 dark:text-emerald-400">
            <CheckCircle2 className="size-4" />
            <span className="text-sm">Repo linked. Ask Polaris to modify any file.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "edit",
    label: "Edit in browser",
    icon: Code2,
    content: (
      <div className="rounded-lg border border-border/60 bg-card/40 overflow-hidden font-mono text-sm">
        <div className="flex border-b border-border/50 bg-muted/30 px-2 py-1.5 text-xs text-muted-foreground">
          <span>src/app/page.tsx</span>
        </div>
        <div className="p-3">
          <pre className="overflow-x-auto text-[13px] leading-relaxed">
            <code>
              <span className="text-muted-foreground">{"export default function Page() {"}</span>
              {"\n  "}
              <span className="text-violet-400">return</span>
              <span className="text-amber-400"> {"("}</span>
              {"\n    "}
              <span className="text-amber-400">&lt;main&gt;</span>
              {"\n      "}
              <span className="text-emerald-600 dark:text-emerald-400">&lt;h1&gt;Dashboard&lt;/h1&gt;</span>
              {"\n    "}
              <span className="text-amber-400">&lt;/main&gt;</span>
              {"\n  "}
              <span className="text-amber-400">);</span>
              {"\n"}
              <span className="text-muted-foreground">{"}"}</span>
            </code>
          </pre>
        </div>
        <div className="border-t border-border/50 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
          Ask Polaris: &quot;Add a sidebar with navigation&quot;
        </div>
      </div>
    ),
  },
];

export function ProductSamplesTabs() {
  return (
    <section
      className="mt-20 w-full"
      aria-labelledby="product-samples-heading"
    >
      <h2
        id="product-samples-heading"
        className="text-center text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        See Polaris in action
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
        Click a tab to see a sample of what you get.
      </p>

      <Tabs defaultValue={samples[0].id} className="mt-8 w-full">
        <TabsList className="mb-4 flex w-full flex-wrap justify-center gap-1 rounded-xl bg-muted/50 p-1.5 sm:mb-6">
          {samples.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="gap-2 px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Icon className="size-4 shrink-0" />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {samples.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="mt-0 min-h-[240px] focus-visible:outline-none"
          >
            <div className="mx-auto max-w-2xl">{tab.content}</div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
