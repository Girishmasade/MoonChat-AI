import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "dotenv";

config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY in .env file");
}

export const geminiai = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});