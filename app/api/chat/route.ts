import OpenAI from "openai";
import { Project } from "@/lib/types";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://diya.dev",
    "X-Title": "Diya.OS Portfolio",
  },
});

function buildSystemPrompt(projectContext: Project | null): string {
  const base = `You are Diya AI — the intelligent portfolio assistant for Diya Rawat.

Diya is a B.Tech AI & Data Science student and AI agent developer.
She specializes in agentic workflows, LangGraph, Groq, PyTorch, and LLM fine-tuning.
She has built projects including an Identity Verification Agent, Semantic Kernel Fine-Tuner, Vein Detection System, and Heart Failure Prediction model.

Your job:
- Answer questions about Diya's projects, skills, and experience
- When a project is selected, summarize it clearly for recruiters
- Keep answers concise (2–4 sentences max unless asked for detail)
- Speak in first person as Diya's representative ("Diya has..." or "Her strongest work...")
- Never make up projects or skills not in the context provided`;

  if (!projectContext) return base;

  return `${base}

Currently selected project context:
${JSON.stringify(projectContext, null, 2)}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: { role: "user" | "assistant"; content: string }[] =
      body.messages ?? [];
    const projectContext: Project | null = body.projectContext ?? null;

    const stream = await client.chat.completions.create({
      model: "anthropic/claude-3-5-haiku",
      stream: true,
      max_tokens: 512,
      messages: [
        { role: "system", content: buildSystemPrompt(projectContext) },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response("Diya AI is unavailable right now.", { status: 500 });
  }
}
