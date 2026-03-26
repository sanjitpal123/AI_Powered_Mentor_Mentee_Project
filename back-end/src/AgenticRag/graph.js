import { StateGraph } from '@langchain/langgraph'
import llm from './llm.js';
import { AIMessage, HumanMessage, ToolMessage } from '@langchain/core/messages';
import { state } from './state.js';
import { createSession, getAllMentors, getSessionById, getSessions, rescheduleSession, updateSessions } from './tools.js';

import { ToolNode } from "@langchain/langgraph/prebuilt";
const QuerySolverTools = [getSessionById, getSessions, getAllMentors, updateSessions, rescheduleSession, createSession];
const QuerySolverToolNode = new ToolNode(QuerySolverTools)
async function frontDesk(state) {
    try {
        const systemPrompt = `
You are the FrontDesk router of a system.

Your ONLY job is to classify the user query and decide which agent should handle it.

You MUST NOT answer the question.

-----------------------------------
ROUTING RULES:

1. Route to "QUERYSOLVER" if the query is about:
- booking a session
- creating, updating, cancelling sessions
- fetching mentors or sessions
- platform-related actions

2. Route to "VIRTUALMENTOR" if the query is about:
- learning guidance
- career advice
- roadmaps
- teaching concepts

3. Route to "GENERAL" if the query is:
- greetings (hi, hello)
- casual conversation
- unrelated small talk

-----------------------------------
IMPORTANT RULES:
- Do NOT answer the user
- ONLY return JSON
- ALWAYS choose one of:
  "QUERYSOLVER", "VIRTUALMENTOR", "GENERAL"

-----------------------------------
OUTPUT FORMAT:

{
  "message":"......" ,
  "nextRepresentative": "QUERYSOLVER" | "VIRTUALMENTOR" | "GENERAL"
}
`;

        const response = await llm.invoke([{ role: "system", content: systemPrompt }, ...state.messages]);
        const result = JSON.parse(response.content)
        return {
            messages: [new AIMessage(result.message)],
            nextRepresentative: result.nextRepresentative
        }

    } catch (error) {
        throw error;
    }

}
function formatedMessage(messages) {
    return messages.map((msg) => {
        if (msg instanceof AIMessage) return msg;
        if (msg.role === "user" || msg.role === "human") {
            return new HumanMessage(msg.content)
        }
        if (msg.role === "assistant" || msg.role === "ai") {
            return new AIMessage(msg.content)
        }
        return msg
    })
}
function virtualMentor(state) {
    return {
        messages: new AIMessage("Thank for contact with virtual mentor")
    }
}

async function QuerySolver(state) {
    const message = formatedMessage(state.messages);
    const systemPrompt = `
You are an AI Smart Mentee Support Assistant.

YOU HAVE ACCESS TO LOGGED IN USER:
PROFILE: ${JSON.stringify(state?.userProfile)}
USERID: ${state?.userId}

Time Handling Rule:
- If time is like "5pm", "5 o clock", convert to "HH:mm" (24-hour format)

-----------------------------------
TOOLS YOU CAN USE:
- getSessions → fetch sessions
- createSessions → create new session
- cancelSessions → cancel session
- getAllMentors → get mentors
- rescheduleSession → reschedule session

-----------------------------------
BEHAVIOR RULES:

1. Call a tool ONLY if required to perform an action
2. If required information is missing → ASK the user (DO NOT call tool)
3. After receiving tool result:
   - DO NOT call tool again
   - EXPLAIN the result to the user clearly

4. NEVER:
   - invent tool names
   - call tools not listed

5. If query is not related:
   Respond: "This question is not related to my domain."

-----------------------------------
IMPORTANT:
- Only call ONE tool at a time
- Do NOT loop tool calls
- If tool already executed → respond with final answer
`;
    const llmwithTools = llm.bindTools(QuerySolverTools);


    const res = await llmwithTools.invoke([
        {
            role: "system", content: systemPrompt
        },
        ...message
    ]);
    return {
        messages: [res]
    }
}
function wheretogo(state) {
    if (state.nextRepresentative === "QUERYSOLVER") {
        return "QuerySolver"
    }
    else if (state.nextRepresentative === "VIRTUALMENTOR") {
        return "virtualMentor"
    }
    else {
        return "__end__"
    }

}
async function executingQuerySolverTool(state) {
    const messages = formatedMessage(state.messages);
    const response = await QuerySolverToolNode.invoke({ messages });
    return {
        messages: response.messages
    }
}
function QueryPathDecider(state) {
    const lastMessage = state.messages[state.messages.length - 1];

    // ✅ If last message is tool result → STOP
    if (lastMessage instanceof ToolMessage) {
        return "__end__";
    }

    // ✅ If LLM wants to call tool → go to tool
    if (lastMessage.tool_calls?.length) {
        return "queryTool";
    }

    return "__end__";
}
export const AgenticGraph = new StateGraph(state).addNode("frontDesk", frontDesk)
    .addNode("virtualMentor", virtualMentor)
    .addNode("QuerySolver", QuerySolver)
    .addNode("queryTool", executingQuerySolverTool)
    .addEdge("__start__", "frontDesk")
    .addConditionalEdges("frontDesk", wheretogo, {
        QuerySolver: "QuerySolver",
        virtualMentor: "virtualMentor",
        __end__: "__end__"

    }).addConditionalEdges("QuerySolver", QueryPathDecider, {
        queryTool: "queryTool",
        __end__: "__end__"
    })
    .addEdge("queryTool", "QuerySolver")
    .addEdge("virtualMentor", "__end__");
