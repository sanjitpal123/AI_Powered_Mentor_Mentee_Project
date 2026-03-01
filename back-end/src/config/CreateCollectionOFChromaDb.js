// CreateCollectionOFChromaDb.js
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false,
});

async function CreateCollection() {
  try {
    const collection = await client.getOrCreateCollection({
      name: "storementors",
    });
    return collection;
  } catch (error) {
    console.log("Error creating collection:", error);
  }
}

export default CreateCollection;
