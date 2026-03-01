import CreateCollection from "../../config/CreateCollectionOFChromaDb.js";
import Embedding from "../Embedding";

async function GetTopMentor(goal) {
  try {
    const collection = await CreateCollection();
    const embeddingGoal = await Embedding(goal);
    const answer = await collection.query({
      queryEmbeddings: embeddingGoal,
      nResults: 5,
    });
    return answer;
  } catch (error) {
    console.log("error", error);
  }
}
export default GetTopMentor;
