import e from "express";
import {
  CreateNotice,
  GetAUserNotification,
  UpdateIsRead,
} from "../Controller/Notification.js";
import { Auth } from "../middleWear/Auth.js";

const NotificationRouter = e.Router();

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification APIs
 */

/**
 * @swagger
 * /notification/create:
 *   post:
 *     summary: Create a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiver
 *               - message
 *               - type
 *             properties:
 *               receiver:
 *                 type: string
 *               message:
 *                 type: string
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               convoId:
 *                 type: string
 *               sessionId:
 *                 type: string
 *               isRead:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
NotificationRouter.post("/create", Auth, CreateNotice);

/**
 * @swagger
 * /notification/getnotfication:
 *   get:
 *     summary: Get logged-in user's notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *       404:
 *         description: No notifications found
 */
NotificationRouter.get("/getnotfication", Auth, GetAUserNotification);

/**
 * @swagger
 * /notification/update-isread:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications updated successfully
 *       403:
 *         description: Update failed
 */
NotificationRouter.put("/update-isread", Auth, UpdateIsRead);

export default NotificationRouter;