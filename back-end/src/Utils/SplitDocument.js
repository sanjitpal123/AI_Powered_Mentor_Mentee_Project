import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import vectorStore from "./PineConeStore.js";

async function SplitDocument(content) {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    // ✅ 1. Await here
    const texts = await splitter.splitText(content);

    // ✅ 2. Proper Document creation + return
    const docs = texts.map(
      (text, index) =>
        new Document({
          pageContent: text,
          metadata: { chunk: index },
        }),
    );

    console.log("spliting...", texts);
    // ✅ 3. Store in Pinecone
    await vectorStore.addDocuments(docs);

    console.log("✅ Document stored successfully");
  } catch (error) {
    console.log("❌ error", error);
    return error;
  }
}

export default SplitDocument;
