import * as z from "zod";
import { tool } from "langchain";
import dotenv from "dotenv";
dotenv.config();

import { tavily } from "@tavily/core";

import {
    CancelledSessionService,
    UpdateSessionByIdService,
    GetAllSessions,
    GetASessionByid,
    RescheduleService,
    sessionSearchService,
    SearchSessionByCategoryService,
    CreateSessionService,
} from "../Services/Session.Service.js";

import { GetAllMentorsService } from "../Services/Mentor.js";
import User from "../Model/UserSchema.js";
import Feedback from "../Model/Feedback.js";

const tvly = tavily({ apiKey: process.env.TAVILY });

/* =====================================================
   🌐 WEB SEARCH TOOL
===================================================== */
export const webSearch = tool(
    async ({ query }) => {
        try {
            const res = await tvly.search(query);
            return JSON.stringify(res.results?.slice(0, 5) || []);
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "webSearch",
        description: "Search information from the internet",
        schema: z.object({
            query: z.string(),
        }),
    }
);

/* =====================================================
   📅 GET ALL SESSIONS
===================================================== */
export const getSessions = tool(
    async (_, config) => {
        const { userId } = config.configurable;

        try {
            const sessions = await GetAllSessions(userId);

            if (!sessions || sessions.length === 0) {
                return `❌ No sessions found`;
            }

            const simplified = sessions.map((s) => ({
                id: s._id,
                date: s.date,
                topic: s.topic,
                status: s.status,
            }));

            return JSON.stringify(simplified.slice(0, 5));
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "getSessions",
        description: "Get all sessions for logged-in user",
        schema: z.object({}), // ✅ no input
    }
);

/* =====================================================
   📌 GET SESSION BY ID
===================================================== */
export const getSessionById = tool(
    async ({ id }) => {
        try {
            const session = await GetASessionByid(id);

            if (!session) {
                return `❌ Session not found`;
            }

            const simplified = {
                id: session._id,
                date: session.date,
                topic: session.topic,
                status: session.status,
            };

            return JSON.stringify(simplified);
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "getSessionById",
        description: "Get a session by ID",
        schema: z.object({
            id: z.string(),
        }),
    }
);

/* =====================================================
   ➕ CREATE SESSION
===================================================== */
export const createSession = tool(
    async ({ mentor_id, date, topic, notes }) => {
        try {
            const res = await CreateSessionService({
                mentor: mentor_id,
                date: new Date(date).toISOString(),
                topic,
                notes,
            });

            return `✅ Session created successfully`;
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "createSession",
        description: "Create a new session",
        schema: z.object({
            mentor_id: z.string(),
            date: z.string(),
            topic: z.string(),
            notes: z.string(),
        }),
    }
);

/* =====================================================
   🔄 UPDATE SESSION
===================================================== */
export const updateSessions = tool(
    async ({ id, mentor, date, topic, notes }) => {
        try {
            const res = await UpdateSessionByIdService(id, {
                mentor,
                date,
                topic,
                notes,
            });

            if (!res) return `❌ Failed to update session`;

            return `✅ Session updated successfully`;
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "updateSessions",
        description: "Update session details",
        schema: z.object({
            id: z.string(),
            mentor: z.string(),
            date: z.string(),
            topic: z.string(),
            notes: z.string().optional(),
        }),
    }
);

/* =====================================================
   📆 RESCHEDULE SESSION
===================================================== */
export const rescheduleSession = tool(
    async ({ id, date }) => {
        try {
            const res = await RescheduleService(id, { date });

            if (!res) return `❌ Failed to reschedule`;

            return `✅ Session rescheduled successfully`;
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "rescheduleSession",
        description: "Reschedule a session (change date only)",
        schema: z.object({
            id: z.string(),
            date: z.string(),
        }),
    }
);

/* =====================================================
   ❌ CANCEL SESSION
===================================================== */
export const cancelSessions = tool(
    async ({ id }) => {
        try {
            const res = await CancelledSessionService(id);

            if (!res) return `❌ Failed to cancel session`;

            return `✅ Session cancelled successfully`;
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "cancelSessions",
        description: "Cancel a session",
        schema: z.object({
            id: z.string(),
        }),
    }
);

/* =====================================================
   🔍 SEARCH SESSIONS
===================================================== */
export const searchSessions = tool(
    async ({ query }) => {
        try {
            const res = await sessionSearchService(query);

            if (!res || res.length === 0) {
                return `❌ No results found`;
            }

            return JSON.stringify(res.slice(0, 5));
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "searchSessions",
        description: "Search sessions by keyword",
        schema: z.object({
            query: z.string(),
        }),
    }
);

/* =====================================================
   🏷️ SEARCH BY CATEGORY
===================================================== */
export const searchSessionsByCategory = tool(
    async ({ userId, category }) => {
        try {
            const res = await SearchSessionByCategoryService(userId, category);

            if (!res || res.length === 0) {
                return `❌ No sessions found for category`;
            }

            return JSON.stringify(res.slice(0, 5));
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "searchSessionsByCategory",
        description: "Search sessions by category",
        schema: z.object({
            userId: z.string(),
            category: z.string(),
        }),
    }
);

/* =====================================================
   👨‍🏫 GET ALL MENTORS
===================================================== */
export const getAllMentors = tool(
    async () => {
        try {
            const mentors = await GetAllMentorsService();

            if (!mentors || mentors.length === 0) {
                return `❌ No mentors found`;
            }

            const simplified = mentors.map((m) => ({
                id: m._id,
                name: m.name,
                email: m.email,
                skills: m.skills,
            }));

            return JSON.stringify(simplified.slice(0, 5));
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "getMentors",
        description: "Get all mentors",
        schema: z.object({}),
    }
);
export const getMenteeFeedback = tool(
    async (_, config) => {
        const { userId } = config.configurable;

        try {
            const getProfile = await Feedback.find({
                $or: [{ mentee: userId }, { mentor: userId }],
            });

            return JSON.stringify(getProfile);
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    },
    {
        name: "getMenteeFeedback",
        description: "Get feedback of logged-in user",
        schema: z.object({}), // ✅ removed userId
    }
);

export const getMenteeOfAMentor = tool(
    async ({ mentorId }) => {
        try {
            // Fetch mentor with mentees populated
            const mentor = await User.findById(mentorId)
                .populate("mentees", "name email") // optional fields
                .lean();

            if (!mentor) {
                return JSON.stringify({
                    success: false,
                    message: "Mentor not found",
                });
            }

            console.log('mentees', mentor.mentees)
            return JSON.stringify({
                success: true,
                count: mentor.mentees.length,
                mentees: mentor.mentees,
            });
        } catch (error) {
            return JSON.stringify({
                success: false,
                message: error.message,
            });
        }
    },
    {
        name: "getMenteeOfAMentor",
        description: "Get all mentees of a mentor using mentorId",
        schema: z.object({
            mentorId: z.string().describe("The ID of the mentor"),
        }),
    }
);