import { createOpenRouter } from "@openrouter/ai-sdk-provider";

/** OpenRouter model: Qwen3 VL 30B A3B Thinking (free tier, better tool-use) */
export const OPENROUTER_MODEL_ID = "qwen/qwen3-vl-30b-a3b-thinking";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Returns the OpenRouter chat model for AI tasks.
 * Requires OPENROUTER_API_KEY to be set in the environment.
 */
export function getOpenRouterModel() {
  return openrouter(OPENROUTER_MODEL_ID);
}
