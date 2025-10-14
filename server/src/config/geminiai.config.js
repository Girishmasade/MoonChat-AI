import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY in .env file");
}

export const geminiai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("Gemini key:", process.env.GEMINI_API_KEY);