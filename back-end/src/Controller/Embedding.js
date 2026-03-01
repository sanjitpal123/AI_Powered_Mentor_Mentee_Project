// Embedding.js
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const HF_TOKEN = process.env.HUGGING_FACE;
const client = new InferenceClient(HF_TOKEN);

async function Embedding(input) {
  try {
    const result = await client.featureExtraction({
      model: "Qwen/Qwen3-Embedding-0.6B",
      inputs: input,
      provider: "hf-inference",
    });

    // ensure it returns a flat vector
    const vector = Array.isArray(result[0]) ? result[0] : result;
    console.log("Embedding length:", vector.length);

    return vector;
  } catch (error) {
    console.error("Error generating embedding:", error);
  }
}

export default Embedding;
