import CreateCollection from "../../config/CreateCollectionOFChromaDb.js";
import { GetAllMentorsService } from "../../Services/Mentor.js";
import Embedding from "../Embedding.js"; // your function returning embedding vector

async function MentorStoredToChromaDb() {
  try {
    // 1️⃣ Create or get Chroma collection
    const collection = await CreateCollection();

    // 2️⃣ Get all mentors from DB
    const Mentors = await GetAllMentorsService();

    // 3️⃣ Loop through mentors and add to collection
    for (const mentor of Mentors) {
      const id = mentor._id.toString();
      const document = `Mentor is skilled in ${mentor.skils}`; // skills string
      const embeddingVector = await Embedding(mentor); // should return array of numbers

      await collection.add({
        ids: [id],
        documents: [document],
        embeddings: [embeddingVector],
        metadatas: [mentor], // store full mentor object if needed
      });
    }

    console.log("All mentors stored successfully in Chroma DB ✅");
  } catch (error) {
    console.error("Error storing mentors to Chroma DB:", error);
  }
}

export default MentorStoredToChromaDb;
