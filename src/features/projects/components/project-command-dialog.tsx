import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";

type FilterMode = "all" | "github";

interface ProjectsCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filter?: FilterMode;
}

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return <FaGithub className="size-4 text-muted-foreground" />;
  }

  if (project.importStatus === "failed") {
    return <AlertCircleIcon className="size-4 text-muted-foreground" />;
  }

  if (project.importStatus === "importing") {
    return (
      <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
    );
  }

  return <GlobeIcon className="size-4 text-muted-foreground" />;
};

export const ProjectsCommandDialog = ({
  open,
  onOpenChange,
  filter = "all",
}: ProjectsCommandDialogProps) => {
  const router = useRouter();
  const projects = useProjects();

  const filteredProjects =
    filter === "github"
      ? projects?.filter((p) => p.importStatus === "completed") ?? []
      : projects ?? [];

  const handleSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`);
    onOpenChange(false);
  };

  const title = filter === "github" ? "Projects from GitHub" : "All Projects";
  const description =
    filter === "github"
      ? "Open a project imported from GitHub"
      : "Search and open any project";
  const placeholder =
    filter === "github"
      ? "Search GitHub projects..."
      : "Search projects...";
  const heading = filter === "github" ? "From GitHub" : "Projects";

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
    >
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>
          {filter === "github"
            ? "No projects imported from GitHub."
            : "No projects found."}
        </CommandEmpty>
        <CommandGroup heading={heading}>
          {filteredProjects.map((project) => (
            <CommandItem
              key={project._id}
              value={`${project.name}-${project._id}`}
              onSelect={() => handleSelect(project._id)}
            >
              {getProjectIcon(project)}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
