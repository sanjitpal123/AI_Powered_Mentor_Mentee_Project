import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import llm from "../../config/LlmConfig.js";
import { StringOutputParser } from "@langchain/core/output_parsers";
async function extractGoal(message) {
  const Message = ChatPromptTemplate.fromMessages({
    template: ` Extract user goal into one sentence 
    goal :${message}

    Career Goal:`,
    inputVariables: [message],
  });
  const chain = Message.pipe(llm).pipe(new StringOutputParser());
  const response = await chain.invoke({ message });
  console.log("responseas to extract intent of mentee", response);
  return response;
}
export default extractGoal;
