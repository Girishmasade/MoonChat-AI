// scripts/ingestDocs.js
import { vectorStore } from "../lib/vectoreStore.lib.js";

await vectorStore.addDocuments([
  {
    pageContent: "Your refund policy is 7 days...",
    metadata: { source: "policy.txt" },
  },
]);