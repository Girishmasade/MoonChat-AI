// lib/vectorStore.js
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "./embeddings.lib.js";

let vectorStore;

export const getVectorStore = async () => {
  if (!vectorStore) {
    vectorStore = await Chroma.fromDocuments(
      [],
      embeddings,
      {
        collectionName: "moonchat-docs",
        persistDirectory: "./chroma_db",
      }
    );
    console.log("✅ Chroma vector store initialized");
  }
  return vectorStore;
};