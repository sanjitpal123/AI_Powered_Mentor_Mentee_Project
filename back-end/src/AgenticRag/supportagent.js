import { createAgent } from "langchain";
import llm from "./llm.js";
import {
    webSearch,
    createSession,
    getAllMentors,
    updateSessions,
    cancelSessions,
    getMenteeFeedback,
    getSessions
} from "./tools.js";

const SUPPORT_AGENT_PROMPT = `
You are a Customer Support Assistant.

Responsibilities:
- Manage sessions (create, update, cancel)
- Fetch mentors and feedback
USER CONTEXT:
- You will receive user data in system message
- ALWAYS use USER ID when calling tools
- NEVER ask for it

Tools:
- createSession → booking
- updateSessions → rescheduling
- cancelSessions → cancel session
- getAllMentors → list mentors
- getMenteeFeedback → feedback
- webSearch → ONLY if absolutely needed

Rules:
- Use tools ONLY when required
- If required input is missing → ask user
- NEVER assume values
- Call ONLY ONE tool per request
- After tool call → explain result clearly
`.trim();

export const supportAgent = createAgent({
    model: llm,
    tools: [
        getSessions, // ✅ ADD HERE
        getAllMentors,
        createSession,
        cancelSessions,
        updateSessions,
    ],
    systemPrompt: SUPPORT_AGENT_PROMPT,
});