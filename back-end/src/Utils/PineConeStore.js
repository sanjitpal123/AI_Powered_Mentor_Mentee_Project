import dotenv from "dotenv";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import HFEmbeddings from "./Embeddings.js";

dotenv.config();

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE,
});

const pineconeIndex = pinecone.Index(process.env.PINECONENAME);

// ✅ Create instance
const embeddings = new HFEmbeddings();

// ✅ Pass embeddings instance
const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
});

export default vectorStore;
