/**
 * Stack options for new project creation.
 * Logos from Simple Icons CDN: https://cdn.simpleicons.org/{name}/{color}
 */

const iconBase = "https://cdn.simpleicons.org";
const iconColor = "94a3b8"; // muted gray, works on dark bg

export interface StackOption {
  id: string;
  label: string;
  promptValue: string;
  logoUrl: string;
}

export const FRAMEWORKS: StackOption[] = [
  { id: "next", label: "Next.js", promptValue: "Next.js", logoUrl: `${iconBase}/nextdotjs/${iconColor}` },
  { id: "react", label: "React", promptValue: "React", logoUrl: `${iconBase}/react/${iconColor}` },
  { id: "vite", label: "Vite", promptValue: "Vite", logoUrl: `${iconBase}/vite/${iconColor}` },
  { id: "vue", label: "Vue", promptValue: "Vue", logoUrl: `${iconBase}/vuedotjs/${iconColor}` },
  { id: "express", label: "Express", promptValue: "Express", logoUrl: `${iconBase}/express/${iconColor}` },
  { id: "fastapi", label: "FastAPI", promptValue: "FastAPI", logoUrl: `${iconBase}/fastapi/${iconColor}` },
  { id: "django", label: "Django", promptValue: "Django", logoUrl: `${iconBase}/django/${iconColor}` },
  { id: "any-fw", label: "Any", promptValue: "", logoUrl: "" },
];

export const LANGUAGES: StackOption[] = [
  { id: "typescript", label: "TypeScript", promptValue: "TypeScript", logoUrl: `${iconBase}/typescript/${iconColor}` },
  { id: "javascript", label: "JavaScript", promptValue: "JavaScript", logoUrl: `${iconBase}/javascript/${iconColor}` },
  { id: "python", label: "Python", promptValue: "Python", logoUrl: `${iconBase}/python/${iconColor}` },
  { id: "any-lang", label: "Any", promptValue: "", logoUrl: "" },
];

export const PACKAGE_MANAGERS: StackOption[] = [
  { id: "npm", label: "npm", promptValue: "npm", logoUrl: `${iconBase}/npm/${iconColor}` },
  { id: "yarn", label: "Yarn", promptValue: "Yarn", logoUrl: `${iconBase}/yarn/${iconColor}` },
  { id: "pnpm", label: "pnpm", promptValue: "pnpm", logoUrl: `${iconBase}/pnpm/${iconColor}` },
  { id: "any-pm", label: "Any", promptValue: "", logoUrl: "" },
];

export function buildStackPrompt(
  framework: StackOption,
  language: StackOption,
  packageManager: StackOption,
  userPrompt: string
): string {
  const parts: string[] = [];
  if (framework.promptValue) parts.push(`Framework: ${framework.promptValue}`);
  if (language.promptValue) parts.push(`Language: ${language.promptValue}`);
  if (packageManager.promptValue) parts.push(`Package manager: ${packageManager.promptValue}`);
  const stackLine =
    parts.length > 0
      ? `[Preferred stack: ${parts.join(", ")}.]\n\n`
      : "";
  return stackLine + (userPrompt.trim() || "Create a new project.");
}
