import express from "express";
import {
  DeleteForEveryone,
  DeleteForMe,
  DeleteMessage,
  EditMessage,
  GetUserMessage,
  SeenMessage,
  SendMessage,
} from "../Controller/Message.js";
import { Auth } from "../middleWear/Auth.js";

const MessageRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging APIs
 */

/**
 * @swagger
 * /message/:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversation
 *               - text
 *             properties:
 *               conversation:
 *                 type: string
 *               text:
 *                 type: string
 *               isRead:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Missing fields
 */
MessageRouter.post("/", Auth, SendMessage);

/**
 * @swagger
 * /message/getconvomessage:
 *   post:
 *     summary: Get messages of a conversation
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *       404:
 *         description: Messages not found
 */
MessageRouter.post("/getconvomessage", Auth, GetUserMessage);

/**
 * @swagger
 * /message/deletemessage/{id}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 */
MessageRouter.delete("/deletemessage/:id", Auth, DeleteMessage);

/**
 * @swagger
 * /message/editmessage/{id}:
 *   put:
 *     summary: Edit a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message updated successfully
 */
MessageRouter.put("/editmessage/:id", Auth, EditMessage);

/**
 * @swagger
 * /message/mark_seen:
 *   post:
 *     summary: Mark messages as seen
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               convoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Messages marked as seen
 */
MessageRouter.post("/mark_seen", Auth, SeenMessage);

/**
 * @swagger
 * /message/deleteforeveryone/{id}:
 *   delete:
 *     summary: Delete message for everyone
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Message deleted for everyone
 */
MessageRouter.delete("/deleteforeveryone/:id", DeleteForEveryone);

/**
 * @swagger
 * /message/deleteforme/{id}:
 *   delete:
 *     summary: Delete message for me
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Message deleted for user
 */
MessageRouter.delete("/deleteforme/:id", Auth, DeleteForMe);

export default MessageRouter;