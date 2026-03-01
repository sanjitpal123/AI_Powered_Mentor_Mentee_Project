import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import llm from "./Llm.js";
export const AskQuestion = async (systemPrompt, userPrompt) => {
  try {
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ];

    console.log("prmpt", messages);
    const res = await llm.invoke(messages);

    console.log("response generating", res.content);
    return res.content;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
