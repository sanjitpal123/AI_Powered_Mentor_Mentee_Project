import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API,
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
});

export default llm;
