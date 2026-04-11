
import { groq, MODEL, FALLBACK_MODEL } from "../../config/qroq.config.js";

export async function generateAIResponse({ message, history, context }) {
  const systemPrompt = `
You are an advanced AI assistant.

RULES:
- Use context strictly if provided
- If unsure, say "I don't know"
- Avoid hallucination
- Be clear and structured
`;

  const messages = [
    { role: "system", content: systemPrompt },

    ...(context ? [{ role: "system", content: `Context:\n${context}` }] : []),

    ...history,

    { role: "user", content: message },
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    return completion.choices[0]?.message?.content;
  } catch (err) {
    console.error("Primary model failed:", err);

    const fallback = await groq.chat.completions.create({
      model: FALLBACK_MODEL,
      messages,
    });

    return fallback.choices[0]?.message?.content || "AI failed";
  }
}
