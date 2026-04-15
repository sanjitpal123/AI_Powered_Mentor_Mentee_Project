import express from "express";
import { Auth } from "../middleWear/Auth.js";
import {
    Conversation,
    GetConvoById,
    GetUserConvo,
    GetAllConvo,
    GetConversationByMentorId,
} from "../Controller/Conversation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Conversation
 *   description: Conversation APIs
 */

/**
 * @swagger
 * /convo:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: Receiver user ID
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *       401:
 *         description: Conversation already exists or cannot create
 */
router.post("/", Auth, Conversation);

/**
 * @swagger
 * /convo/getconvobyid:
 *   post:
 *     summary: Get conversation by ID
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: Conversation ID
 *     responses:
 *       201:
 *         description: Conversation fetched successfully
 *       401:
 *         description: Missing ID
 *       403:
 *         description: Conversation not found
 */
router.post("/getconvobyid", Auth, GetConvoById);

/**
 * @swagger
 * /convo/getuserconvo:
 *   get:
 *     summary: Get all conversations of logged-in user
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User conversations fetched successfully
 *       403:
 *         description: Cannot fetch conversations
 */
router.get("/getuserconvo", Auth, GetUserConvo);

/**
 * @swagger
 * /convo/getall:
 *   get:
 *     summary: Get all conversations (Admin)
 *     tags: [Conversation]
 *     responses:
 *       201:
 *         description: All conversations fetched successfully
 *       404:
 *         description: No conversations found
 */
router.get("/getall", GetAllConvo);

/**
 * @swagger
 * /convo/getbymentor:
 *   post:
 *     summary: Get conversations by mentor ID
 *     tags: [Conversation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: Mentor ID
 *     responses:
 *       201:
 *         description: Conversations fetched successfully
 *       404:
 *         description: Conversations not found
 */
router.post("/getbymentor", GetConversationByMentorId);

export default router;