import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "../hooks/use-projects";
import { Kbd } from "@/components/ui/kbd";
import { Doc } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import {
  AlertCircleIcon,
  ArrowRightIcon,
  GlobeIcon,
  Loader2Icon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return <FaGithub className="size-3.5 text-muted-foreground" />;
  }

  if (project.importStatus === "failed") {
    return <AlertCircleIcon className="size-3.5 text-muted-foreground" />;
  }

  if (project.importStatus === "importing") {
    return (
      <Loader2Icon className="size-3.5 text-muted-foreground animate-spin" />
    );
  }

  return <GlobeIcon className="size-3.5 text-muted-foreground" />;
};

interface ProjectsListProps {
  onViewAll: () => void;
}

const formatTimestamp = (timestamp: number) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

function CreationHistory({ project }: { project: Doc<"projects"> }) {
  const stack = project.creationStack;
  const prompt = project.initialPrompt;
  if (!stack && !prompt) return null;
  const parts: string[] = [];
  if (stack?.framework && stack.framework !== "Any") parts.push(stack.framework);
  if (stack?.language && stack.language !== "Any") parts.push(stack.language);
  if (stack?.packageManager && stack.packageManager !== "Any") parts.push(stack.packageManager);
  const stackLine = parts.length > 0 ? parts.join(" · ") : null;
  return (
    <span className="text-xs text-muted-foreground line-clamp-1">
      {stackLine && prompt ? `${stackLine} — ${prompt}` : stackLine ?? prompt}
    </span>
  );
}

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Last updated</span>
      <Button
        variant="outline"
        asChild
        className="h-auto items-start justify-start p-4 rounded-xl border-l-4 border-l-border bg-card/50 border border-border hover:bg-accent/30 flex flex-col gap-2"
      >
        <Link href={`/projects/${data._id}`} className="group">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 min-w-0">
              {getProjectIcon(data)}
              <div className="min-w-0 flex-1">
                <span className="font-medium truncate block">{data.name}</span>
                <CreationHistory project={data} />
              </div>
            </div>
            <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(data.updatedAt)}
          </span>
        </Link>
      </Button>
    </div>
  );
};

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <Link
      className="text-sm text-foreground/80 font-medium hover:text-foreground py-2 px-2 rounded-lg hover:bg-accent/30 flex items-center justify-between w-full group transition-colors gap-2"
      href={`/projects/${data._id}`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {getProjectIcon(data)}
        <div className="min-w-0 flex-1">
          <span className="truncate block">{data.name}</span>
          <CreationHistory project={data} />
        </div>
      </div>
      <span className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors shrink-0">
        {formatDistanceToNow(data.updatedAt)}
      </span>
    </Link>
  );
};

export const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
  const projects = useProjectsPartial(6);

  if (projects === undefined) {
    return <Spinner className="size-4 text-ring" />;
  }

  const [mostRecent, ...rest] = projects;

  return (
    <div className="flex flex-col gap-4">
      {mostRecent ? <ContinueCard data={mostRecent} /> : null}
      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Recent projects
            </span>
            <button onClick={onViewAll} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <span>View All</span>
              <Kbd className="bg-muted border-border text-muted-foreground">⌘K</Kbd>
            </button>
          </div>
          <ul className="flex flex-col">
            {rest.map((project) => (
              <ProjectItem key={project._id} data={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
