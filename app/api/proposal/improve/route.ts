import OpenAI from "openai";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { section, instruction, proposalInput } = body;
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
You are Proposal Associate, part of UToldAI's Business Development AI Team.
Improve only the selected proposal section based on the user's instruction.
Return valid JSON only: {"content":"improved section content"}
Keep it professional, practical and suitable for a structural engineering consultancy proposal.
Proposal Context: Client ${proposalInput?.client || ""}, Opportunity ${proposalInput?.opportunity || ""}, Scope ${proposalInput?.scope || ""}
Selected Section Title: ${section?.title}
Selected Section Content: ${section?.content}
Instruction: ${instruction}`;
  const completion = await client.responses.create({ model: process.env.OPENAI_MODEL || "gpt-5-mini", input: prompt });
  return NextResponse.json(JSON.parse(completion.output_text.trim()));
}
