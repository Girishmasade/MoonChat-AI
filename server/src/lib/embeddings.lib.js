// lib/embeddings.js
import { OpenAIEmbeddings } from "@langchain/openai";
import { configDotenv } from "dotenv";
import { HuggingFaceInferenceEmbeddings } 
from "@langchain/community/embeddings/hf";
import {openai_api_key, huggingface_api_key} from '../env/envImportFile.js'

configDotenv({
    path: "./.env"
})

// export const embeddings = new OpenAIEmbeddings({
//   apiKey: openai_api_key,
// });


// export const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: huggingface_api_key,
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

export const embeddings = new HuggingFaceInferenceEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});