import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const client = new InferenceClient(process.env.HUGGING_FACE);

class HFEmbeddings {
  async embedDocuments(texts) {
    const embeddings = await Promise.all(
      texts.map(async (text) => {
        const result = await client.featureExtraction({
          model: "sentence-transformers/all-MiniLM-L6-v2",
          inputs: text,
        });

        return Array.from(result); // ensure plain array
      }),
    );

    return embeddings;
  }

  async embedQuery(text) {
    const result = await client.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });

    return Array.from(result);
  }
}

export default HFEmbeddings;
