// lib/embeddings.js
import { OpenAIEmbeddings } from "@langchain/openai";
import { configDotenv } from "dotenv";
import { HuggingFaceInferenceEmbeddings } 
from "@langchain/community/embeddings/hf";
// import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

configDotenv({
    path: "./.env"
})

// export const embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// export const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: process.env.HUGGINGFACE_API_KEY,
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

export const embeddings = new HuggingFaceInferenceEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});