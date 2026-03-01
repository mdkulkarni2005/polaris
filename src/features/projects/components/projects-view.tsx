"use client";

import { Button } from "@/components/ui/button";
import {
  SparkleIcon,
  KeyboardIcon,
  LightbulbIcon,
  FolderIcon,
  Code2Icon,
} from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { FaGithub } from "react-icons/fa";
import { ProjectsList } from "./projects-list";
import { useProjects } from "../hooks/use-projects";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProjectsCommandDialog } from "./project-command-dialog";
import { ImportGithubDialog } from "./import-github-dialog";
import { NewProjectDialog } from "./new-project-dialog";
import { DashboardCharts } from "./dashboard-charts";
import { ExampleProjects } from "./example-projects";

export const ProjectView = () => {
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [commandDialogFilter, setCommandDialogFilter] = useState<"all" | "github">("all");
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [newProjectInitialPrompt, setNewProjectInitialPrompt] = useState<string | undefined>(undefined);
  const allProjects = useProjects();
  const projectCount = allProjects?.length ?? 0;
  const fromGitHubCount = allProjects?.filter(
    (p) => p.importStatus === "completed"
  ).length ?? 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          setCommandDialogFilter("all");
          setCommandDialogOpen(true);
        }
        if (e.key === "i") {
          e.preventDefault();
          setImportDialogOpen(true);
        }
        if (e.key === "j") {
          e.preventDefault();
          setNewProjectInitialPrompt(undefined);
          setNewProjectDialogOpen(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <ProjectsCommandDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
        filter={commandDialogFilter}
      />
      <ImportGithubDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />
      <NewProjectDialog
        open={newProjectDialogOpen}
        onOpenChange={(open) => {
          setNewProjectDialogOpen(open);
          if (!open) setNewProjectInitialPrompt(undefined);
        }}
        initialPrompt={newProjectInitialPrompt}
      />
      <SiteHeader
        rightSlot={
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "size-9",
              },
            }}
          />
        }
      />

      <div className="relative flex flex-1 flex-col items-center justify-center p-6 md:p-16 overflow-hidden">
        {/* Colored background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/2 left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full bg-cyan-500/10 blur-[80px]" />
          <div className="absolute top-1/3 left-0 h-[40vh] w-[40vw] rounded-full bg-blue-500/10 blur-[80px]" />
        </div>
        <div className="absolute inset-0 bg-sidebar/80" aria-hidden />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6 px-2">
          {/* Two columns on md: actions + list | stats + legend + tips */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
            {/* Left: New, Import, Projects list */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => { setNewProjectInitialPrompt(undefined); setNewProjectDialogOpen(true); }}
                  className="h-full items-start justify-start p-4 flex flex-col gap-6 rounded-xl border-border bg-card/50 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground">
                      <SparkleIcon className="size-4" />
                    </span>
                    <Kbd className="bg-muted border-border text-muted-foreground">⌘J</Kbd>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">New</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setImportDialogOpen(true)}
                  className="h-full items-start justify-start p-4 flex flex-col gap-6 rounded-xl border-border bg-card/50 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground">
                      <FaGithub className="size-4" />
                    </span>
                    <Kbd className="bg-muted border-border text-muted-foreground">⌘I</Kbd>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">Import</span>
                  </div>
                </Button>
              </div>
              <ProjectsList onViewAll={() => { setCommandDialogFilter("all"); setCommandDialogOpen(true); }} />
            </div>

            {/* Right: Stats, Icons legend, Getting started */}
            <div className="md:col-span-3 flex flex-col gap-4">
              {/* Stats - clickable to open project list */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCommandDialogFilter("all");
                    setCommandDialogOpen(true);
                  }}
                  className="rounded-xl border border-border/80 bg-card/40 p-4 text-left transition-colors hover:bg-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center gap-2">
                    <FolderIcon className="size-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Projects</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{projectCount}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Click to open all</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCommandDialogFilter("github");
                    setCommandDialogOpen(true);
                  }}
                  className="rounded-xl border border-border/80 bg-card/40 p-4 text-left transition-colors hover:bg-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center gap-2">
                    <FaGithub className="size-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">From GitHub</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{fromGitHubCount}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Click to open imported</p>
                </button>
              </div>

              {/* What the icons mean */}
              <div className="rounded-xl border border-border/80 bg-card/40 p-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Code2Icon className="size-4 text-muted-foreground" />
                  What these icons mean
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="flex items-center justify-center size-6 rounded bg-muted text-muted-foreground">
                      <SparkleIcon className="size-3.5" />
                    </span>
                    <span><strong className="text-foreground/90">New</strong> — Start a new AI-built project from a prompt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex items-center justify-center size-6 rounded bg-muted text-muted-foreground">
                      <FaGithub className="size-3.5" />
                    </span>
                    <span><strong className="text-foreground/90">Import</strong> — Bring in an existing repo from GitHub</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex items-center justify-center size-6 rounded bg-muted text-muted-foreground">
                      <FolderIcon className="size-3.5" />
                    </span>
                    <span>Polaris-created project (no GitHub link)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex items-center justify-center size-6 rounded bg-muted text-muted-foreground">
                      <FaGithub className="size-3.5" />
                    </span>
                    <span>Imported from GitHub</span>
                  </li>
                </ul>
              </div>

              {/* Shortcuts + Getting started */}
              <div className="rounded-xl border border-border/80 bg-card/40 p-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <KeyboardIcon className="size-4 text-muted-foreground" />
                  Shortcuts
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center justify-between">
                    <span>Open command palette</span>
                    <Kbd className="bg-muted border-border text-muted-foreground text-xs">⌘K</Kbd>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>New project</span>
                    <Kbd className="bg-muted border-border text-muted-foreground text-xs">⌘J</Kbd>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Import from GitHub</span>
                    <Kbd className="bg-muted border-border text-muted-foreground text-xs">⌘I</Kbd>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border/80 bg-card/40 p-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <LightbulbIcon className="size-4 text-muted-foreground" />
                  Getting started
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use <strong className="text-foreground/90">New</strong> to describe what you want—Polaris will scaffold the project. Use <strong className="text-foreground/90">Import</strong> to clone a GitHub repo and edit it with AI. Press <Kbd className="bg-muted border-border text-muted-foreground text-xs">⌘K</Kbd> to search and open any project.
                </p>
              </div>
            </div>
          </div>

          {/* Charts + Example projects - full width */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-2">
            <div className="lg:col-span-1">
              <DashboardCharts />
            </div>
            <div className="lg:col-span-2">
              <ExampleProjects
                onSelectExample={(prompt) => {
                  setNewProjectInitialPrompt(prompt);
                  setNewProjectDialogOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};
