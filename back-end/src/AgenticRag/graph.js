import { context, createAgent } from "langchain";
import llm from "./llm.js";
import { z } from "zod";
import { tool } from "langchain";
import {
    webSearch,
    createSession,
    getAllMentors,
    updateSessions,
    cancelSessions,
    getMenteeFeedback,
    getSessions
} from "./tools.js";
import { supportAgent } from "./supportagent.js";
import { virtualMentorAgent } from "./virtualagent.js";

/* ================================
   SUPPORT AGENT TOOL
================================ */
const support_tool = tool(
    async ({ input }, config) => {
        const { userId, userProfileData } = config.configurable;
        const res = await supportAgent.invoke({
            messages: [{
                role: "system", content: `
                logged in user data:
                userId:${userId},
                profile:${userProfileData}
                `}, { role: "user", content: input }],
        }, {
            configurable: { userId, userProfileData }
        });

        const last = res.messages.at(-1);
        return last?.content || "No response from support agent";
    },
    {
        name: "support_agent",
        description: `
Use this when user wants:
- book session
- cancel session
- update session
- view mentors
- platform related help
    `,
        schema: z.object({
            input: z.string(),
        }),
    }
);

/* ================================
   VIRTUAL MENTOR TOOL
================================ */
const mentor_tool = tool(
    async ({ input }, config) => {
        const { userId, userProfileData } = config.configurable
        const res = await virtualMentorAgent.invoke({
            messages: [{
                role: "system", content: `
                logged in user data:
                userId :${userId},
                profile:${userProfileData}
                `}, { role: "user", content: input }],
        });

        const last = res.messages.at(-1);
        return last?.content || "No response from mentor";
    },
    {
        name: "virtual_mentor",
        description: `
Use this when user wants:
- career advice
- learning roadmap
- guidance
- skill suggestions
    `,
        schema: z.object({
            input: z.string(),
        }),
    }
);

/* ================================
   SUPERVISOR PROMPT
================================ */
const SUPERVISOR_PROMPT = `
You are a Supervisor Agent.

Your job:
- Understand user intent
- Delegate to the correct agent

Available tools:
1. support_agent → for session/platform 
2. mentor_tool -> for advice/guidance actions

Rules:
- Call ONLY ONE tool
- After receiving tool response → RETURN FINAL ANSWER
- DO NOT call tools again after getting result
- DO NOT loop
`.trim();

/* ================================
   FINAL SUPERVISOR
================================ */
export const supervisorAgent = createAgent({
    model: llm,
    tools: [
        support_tool,
        mentor_tool


    ],
    systemPrompt: SUPERVISOR_PROMPT,
    recursionLimit: 5,

});