import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export async function POST() {
    const response = await generateText({
        model : anthropic('claude-3-haiku-20240307'),
        prompt: "Write a vegetarian lasagne recipe for people",
        experimental_telemetry: {
            isEnabled: true,
            recordInputs: true,
            recordOutputs: true
        }
    })

    return Response.json({ response  })
}