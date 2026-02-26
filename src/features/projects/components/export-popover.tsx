import ky, { HTTPError } from "ky";
import { boolean, regex, string, success, z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import {
  CheckCheckIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  LoaderIcon,
  XCircleIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Id } from "../../../../convex/_generated/dataModel";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProject } from "../hooks/use-projects";

type ImportGithubResponse = {
  success: boolean;
  projectId: Id<"projects">;
  eventId: string;
};

const formSchema = z.object({
  repoName: z
    .string()
    .min(1, "Repository name is required")
    .max(100, "Repository name is too long")
    regex(
      /^[a-zA-Z0-9._-]+$/,
      "Only alphnumeric charcters, hyphens, underscrores, and dots are dots are allowed"
    ),
    visibility: z.enum(["public", "private"]),
    description: z.string().max(350, "Description is too long")
});

interface ExportPopoverProps {
  projectId: Id<"projects">
}

export const ExportPopover = ({
  projectId
}: ExportPopoverProps) => {
  const project = useProject(projectId)
  const [open, setOpen] = React.useState(false)
  const { openUserProfile } = useClerk();

  const exportStatus = project?.exportStatus
  const exportRepoUrl = project?.exportRepoUrl
  const form = useForm({
    defaultValues: {
      url: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { projectId } = await ky
          .post("/api/github/import", {
            json: { url: value.url },
          })
          .json<{
            success: boolean;
            projectId: Id<"projects">;
            eventId: string;
          }>();

        toast.success("Importing repository...");
        onOpenChange(false);
        form.reset();

        router.push(`/projects/${projectId}`);
      } catch (error) {
        if (error instanceof HTTPError) {
          const body = await error.response.json<{ error: string }>();
          if (body?.error?.includes("Github not connected")) {
            toast.error("Github account not connected", {
              action: {
                label: "Connect",
                onClick: () => openUserProfile(),
              },
            });
            onOpenChange(false);
            return;
          }
        }
        toast.error(
          "Unable to import repository. Please check the URL and try again",
        );
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import from Github</DialogTitle>
          <DialogDescription>
            Enter a GitHub repository URL to import. A new project will be
            created with the repository contents.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="url">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Repository URL</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.state.onBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="https://github.com/owner/repo"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <form.subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "Importing..." : "Import"}
                </Button>
              )}
            </form.subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
