import vectorStore from "./PineConeStore.js";

async function Retrieve(question) {
  try {
    const res = await vectorStore.similaritySearch(question);
    console.log("res", res);
    return res;
  } catch (error) {
    console.log("error", error);
  }
}
export default Retrieve;
