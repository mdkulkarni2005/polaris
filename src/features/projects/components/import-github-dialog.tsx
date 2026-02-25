import ky, { HTTPError } from "ky";
import { boolean, success, z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
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

type ImportGithubResponse = {
  success: boolean;
  projectId: Id<"projects">;
  eventId: string;
};

const formSchema = z.object({
  url: z.url("Please enter a valid URL"),
});

interface ImportGithubDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImportGithubDialog = ({
  open,
  onOpenChange,
}: ImportGithubDialogProps) => {
  const router = useRouter();
  const { openUserProfile } = useClerk();
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
          projectId: Id<"projects">,
          eventId: string;
        }>()
        toast.success("Importing repository...")
        onOpenChange(false)
        form.reset()
        
        router.push(`/projects/${projectId}`)
      } catch {

      }
    },
  });
};
