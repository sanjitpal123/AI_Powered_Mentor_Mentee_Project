import express from "express";
import { Auth } from "../middleWear/Auth.js";
import {
  AgenticRag,
  MenteeProfileAnalizeByAi,
  RagSystem,
  RetriveTopMatchMentor,
  ReviewAnalizedByAi,
  TaskCreation,
} from "../Controller/AiController.js";

const AiRouters = express.Router();

/**
 * @swagger
 * tags:
 *   name: ai-features
 *   description: AI-powered features (Mentor Matching, RAG, Analysis)
 */

/**
 * @swagger
 * /ai-features/match-mentor:
 *   post:
 *     summary: Get top matching mentors using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Mentors fetched successfully
 *       404:
 *         description: No mentors found
 */
AiRouters.post("/match-mentor", Auth, RetriveTopMatchMentor);

/**
 * @swagger
 * /ai-features/mentee-profile-analize:
 *   post:
 *     summary: Analyze mentee profile using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Analysis generated
 *       404:
 *         description: No analysis found
 */
AiRouters.post("/mentee-profile-analize", Auth, MenteeProfileAnalizeByAi);

/**
 * @swagger
 * /ai-features/ai-review-analizer:
 *   post:
 *     summary: Analyze reviews using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Review analyzed successfully
 */
AiRouters.post("/ai-review-analizer", Auth, ReviewAnalizedByAi);

/**
 * @swagger
 * /ai-features/task-creation:
 *   post:
 *     summary: Generate quiz/task using AI
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topic
 *             properties:
 *               topic:
 *                 type: string
 *                 example: JavaScript basics
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Topic is required
 */
AiRouters.post("/task-creation", TaskCreation);

/**
 * @swagger
 * /ai-features/chat-rag:
 *   post:
 *     summary: Ask question using RAG system
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: Who i sanjit
 *     responses:
 *       200:
 *         description: Answer generated
 *       400:
 *         description: Question is required
 */
AiRouters.post("/chat-rag", RagSystem);

/**
 * @swagger
 * /ai-features/askfromagentic:
 *   post:
 *     summary: Ask questions using Agentic AI system (multi-agent with tools)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 example: Can you book a session for me tomorrow at 5pm?
 *     responses:
 *       201:
 *         description: Response generated successfully
 *       400:
 *         description: Query is required
 *       500:
 *         description: Internal server error
 */
AiRouters.post("/askfromagentic", Auth, AgenticRag)

export default AiRouters;
