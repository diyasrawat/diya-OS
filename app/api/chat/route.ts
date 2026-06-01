import { NextRequest, NextResponse } from "next/server";
import { ChatMessage } from "@/lib/types";

// Placeholder: replace with Anthropic SDK call (claude-sonnet-4-6)
export async function POST(req: NextRequest) {
  const { messages }: { messages: ChatMessage[] } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // TODO: wire up Anthropic SDK
  // const client = new Anthropic();
  // const response = await client.messages.create({ model: "claude-sonnet-4-6", ... });

  const lastUserMessage = messages.filter((m) => m.role === "user").at(-1);

  return NextResponse.json({
    message: `Hi! I'm AI Diya. You asked: "${lastUserMessage?.content}". This chat is not yet wired up — add your Anthropic API key to get started.`,
  });
}
