import express from "express";
import { Auth } from "../middleWear/Auth.js";
import {
  SendMessage,
  GetUserMessage,
  DeleteMessage,
  EditMessage,
  SeenMessage,
  DeleteForEveryone,
  DeleteForMe,
} from "../Controller/Message.js";

const MessageRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging APIs
 */

/**
 * @swagger
 * /message/send:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
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
 */
MessageRouter.post("/send", Auth, SendMessage);

/**
 * @swagger
 * /message/get:
 *   post:
 *     summary: Get messages of a conversation
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Messages fetched
 */
MessageRouter.post("/get", Auth, GetUserMessage);

/**
 * @swagger
 * /message/delete/{id}:
 *   delete:
 *     summary: Delete message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Message deleted
 */
MessageRouter.delete("/delete/:id", Auth, DeleteMessage);

/**
 * @swagger
 * /message/edit/{id}:
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
 *         description: Message updated
 */
MessageRouter.put("/edit/:id", Auth, EditMessage);

/**
 * @swagger
 * /message/seen:
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
MessageRouter.post("/seen", Auth, SeenMessage);

/**
 * @swagger
 * /message/deleteforeveryone/{id}:
 *   delete:
 *     summary: Delete message for everyone
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 */
MessageRouter.delete("/deleteforeveryone/:id", Auth, DeleteForEveryone);

/**
 * @swagger
 * /message/deleteforme/{id}:
 *   delete:
 *     summary: Delete message for me
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 */
MessageRouter.delete("/deleteforme/:id", Auth, DeleteForMe);

export default MessageRouter;