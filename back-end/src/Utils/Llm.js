import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "llama-3.1-8b-instant",
  temperature: 0.7,
});

export default llm;
