import { getVectorStore } from "../../lib/vectoreStore.lib.js";

export async function retrieveContext(query) {
  try {
    if (!query || typeof query !== "string") {
      console.error("❌ Invalid query:", query);
      return { context: "", sources: [] };
    }

    const store = await getVectorStore();
    const retriever = store.asRetriever({ k: 4 });

    const docs = await retriever.invoke(query);

    if (!docs.length) {
      return { context: "No relevant context found.", sources: [] };
    }

    const context = docs.map((doc) => doc.pageContent).join("\n");

    const sources = docs.map((doc) => doc.metadata?.source || "unknown");

    return { context, sources };

  } catch (err) {
    console.error("RAG ERROR:", err);
    return { context: "", sources: [] };
  }
}