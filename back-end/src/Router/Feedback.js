import e from "express";
import { Auth } from "../middleWear/Auth.js";
import { CreateFeedBack } from "../Controller/Feedback.js";

const FeedbackRouter = e.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback APIs
 */

/**
 * @swagger
 * /feedback/create:
 *   post:
 *     summary: Create feedback for a mentor by a mentee
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentee
 *               - mentor
 *               - comment
 *             properties:
 *               mentee:
 *                 type: string
 *                 description: Mentee ID
 *               mentor:
 *                 type: string
 *                 description: Mentor ID
 *               comment:
 *                 type: string
 *                 description: Feedback comment
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Could not create feedback
 *       404:
 *         description: Mentee not found
 */
FeedbackRouter.post("/create", Auth, CreateFeedBack);

export default FeedbackRouter;