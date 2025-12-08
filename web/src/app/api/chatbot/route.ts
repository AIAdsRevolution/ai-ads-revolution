import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        { role: "system", content: "Sei il chatbot ufficiale di AI Ads Revolution." },
        { role: "user", content: message }
      ],
    });

    return NextResponse.json({ reply: completion.choices[0].message?.content });

  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json({ reply: "Errore temporaneo" });
  }
}
