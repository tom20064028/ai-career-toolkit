import OpenAI from "openai";

export const runtime = "nodejs"; // 保守啲：用 Node runtime

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
    "X-Title": process.env.OPENROUTER_APP_NAME || "JD-Resume Analyzer",
  },
});

export async function POST(req: Request) {
  try {
    const { jd, resume, focusAreas } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini", // 例子：你可換其他 OpenRouter model
      messages: [
        { role: "system", content: `You are an AI career coach.\n\nGiven a job description and a resume, analyze the candidate\'s readiness for the role.\n\nReturn ONLY JSON:\n{\n"match_score": number,\n"missing_skills": string[],\n"interview_questions": string[]\n}\n\nInterview questions focus more on these weak areas:\n${focusAreas.join(", ")}` },
        {
          role: "user",
          content:
            `JD:\n${jd}\n\nResume:\n${resume} \n\n` +
            `If unsure, still return the structure with empty arrays.`,
        },
      ],
      temperature: 0.2,
    });

    const text = completion.choices?.[0]?.message?.content ?? "{}";
    return Response.json({ raw: text });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}