// config/groq.js
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  throw new Error("❌ Missing GROQ_API_KEY in .env file");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const MODEL = "llama-3.3-70b-versatile"; // the ai use this model
export const FALLBACK_MODEL = "llama-3.1-8b-instant"; // this is the falback model