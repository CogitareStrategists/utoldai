import OpenAI from "openai";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const input = await request.json();
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
You are Proposal Associate, part of UToldAI's Business Development AI Team for consultants.
Create a professional structural engineering consultancy proposal.
Return valid JSON only in this format:
{"title":"Proposal title","sections":[{"title":"Cover Letter","content":"..."}]}
Include: Cover Letter, Project Understanding, Scope of Services, Deliverables, Timeline, Commercials, Terms & Conditions.
Use clear, professional Indian consulting language. Do not include markdown.
Client: ${input.client}
Opportunity: ${input.opportunity}
Scope Required: ${input.scope}
Location: ${input.location || "Not provided"}
Built-up Area: ${input.area || "Not provided"}
Expected Timeline: ${input.timeline || "Not provided"}`;
  const completion = await client.responses.create({ model: process.env.OPENAI_MODEL || "gpt-5-mini", input: prompt });
  return NextResponse.json(JSON.parse(completion.output_text.trim()));
}
