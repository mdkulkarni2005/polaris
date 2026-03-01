import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { inngest } from "@/inngest/client";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../../convex/_generated/api";
import { DEFAULT_CONVERSATION_TITLE } from "@/features/conversations/constants";

const creationStackSchema = z.object({
  framework: z.string(),
  language: z.string(),
  packageManager: z.string(),
});

const requestSchema = z.object({
  prompt: z.string().min(1),
  creationStack: z.optional(creationStackSchema),
  initialPrompt: z.optional(z.string()),
});

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const internalKey = process.env.POLARIS_CONVEX_INTERNAL_VALUE;

  if (!internalKey) {
    return NextResponse.json(
      { error: "Internal key not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { prompt, creationStack, initialPrompt } = requestSchema.parse(body);

  // Generate a random project name
  const projectName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    separator: "-",
    length: 3,
  });

  // Create project and conversation together (with optional stack + prompt for history)
  const { projectId, conversationId } = await convex.mutation(
    api.system.createProjectWithConversation,
    {
      internalKey,
      projectName,
      conversationTitle: DEFAULT_CONVERSATION_TITLE,
      ownerId: userId,
      ...(creationStack && Object.values(creationStack).some(Boolean) && { creationStack }),
      initialPrompt: initialPrompt ?? undefined,
    }
  );

  // Create user message
  await convex.mutation(api.system.createMessage, {
    internalKey,
    conversationId,
    projectId,
    role: "user",
    content: prompt,
  });

  // Create assistant message placholder with processing status
  const assistantMessageId = await convex.mutation(api.system.createMessage, {
    internalKey,
    conversationId,
    projectId,
    role: "assistant",
    content: "",
    status: "processing",
  });

  // Trigger Inggest to process the message
  await inngest.send({
    name: "message/send",
    data: {
      messageId: assistantMessageId,
      conversationId,
      projectId,
      message: prompt,
    },
  });

  return NextResponse.json({ projectId });
}
