"use client";

import { useEffect, useState } from "react";
import ky from "ky";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  FRAMEWORKS,
  LANGUAGES,
  PACKAGE_MANAGERS,
  buildStackPrompt,
  type StackOption,
} from "../constants/stack-options";
import { StackOptionSelector } from "./stack-option-selector";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPrompt?: string;
}

const defaultFramework = FRAMEWORKS.find((f) => f.id === "any-fw") ?? FRAMEWORKS[0];
const defaultLanguage = LANGUAGES.find((l) => l.id === "any-lang") ?? LANGUAGES[0];
const defaultPackageManager = PACKAGE_MANAGERS.find((p) => p.id === "any-pm") ?? PACKAGE_MANAGERS[0];

export const NewProjectDialog = ({
  open,
  onOpenChange,
  initialPrompt,
}: NewProjectDialogProps) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [framework, setFramework] = useState<StackOption>(defaultFramework);
  const [language, setLanguage] = useState<StackOption>(defaultLanguage);
  const [packageManager, setPackageManager] = useState<StackOption>(defaultPackageManager);

  useEffect(() => {
    if (open) {
      setInput(initialPrompt ?? "");
      setFramework(defaultFramework);
      setLanguage(defaultLanguage);
      setPackageManager(defaultPackageManager);
    }
  }, [open, initialPrompt]);

  const handleSubmit = async (message: PromptInputMessage) => {
    const userText = (message.text ?? input).trim();
    if (!userText && !framework.promptValue && !language.promptValue && !packageManager.promptValue) return;
    setIsSubmitting(true);

    const fullPrompt = buildStackPrompt(framework, language, packageManager, userText);

    const creationStack =
      framework.promptValue || language.promptValue || packageManager.promptValue
        ? {
            framework: framework.promptValue || "Any",
            language: language.promptValue || "Any",
            packageManager: packageManager.promptValue || "Any",
          }
        : undefined;

    try {
      const { projectId } = await ky
        .post("/api/projects/create-with-prompt", {
          json: {
            prompt: fullPrompt,
            creationStack,
            initialPrompt: userText || undefined,
          },
        })
        .json<{ projectId: Id<"projects"> }>();

      toast.success("Project created");
      onOpenChange(false);
      setInput("");
      router.push(`/projects/${projectId}`);
    } catch {
      toast.error("Unable to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Choose your stack, then describe what you want to build.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-4 pb-2">
          <StackOptionSelector
            title="Framework"
            options={FRAMEWORKS}
            selectedId={framework.id}
            onSelect={setFramework}
          />
          <StackOptionSelector
            title="Language"
            options={LANGUAGES}
            selectedId={language.id}
            onSelect={setLanguage}
          />
          <StackOptionSelector
            title="Package manager"
            options={PACKAGE_MANAGERS}
            selectedId={packageManager.id}
            onSelect={setPackageManager}
          />
        </div>

        <div className="border-t border-border px-4 pt-3 pb-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            What do you want to build?
          </p>
          <PromptInput onSubmit={handleSubmit} className="border-none">
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="e.g. A dashboard with sidebar and auth, or a REST API for todos..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
                disabled={isSubmitting}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit
                disabled={isSubmitting}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </DialogContent>
    </Dialog>
  );
};
