// config/groq.js
import Groq from "groq-sdk";
import { groq_api_key } from "../env/envImportFile.js";

if (!groq_api_key) {
  throw new Error("❌ Missing GROQ_API_KEY in .env file");
}

export const groq = new Groq({
  apiKey: groq_api_key,
});

export const MODEL = "llama-3.3-70b-versatile"; // the ai use this model
export const FALLBACK_MODEL = "llama-3.1-8b-instant"; // this is the falback model