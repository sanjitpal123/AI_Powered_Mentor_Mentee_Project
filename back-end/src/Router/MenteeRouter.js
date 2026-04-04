import express from "express";
import { GetAllMentee, GetMenteeById } from "../Controller/Mentee.js";

const MenteeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mentee
 *   description: Mentee APIs
 */

/**
 * @swagger
 * /mentee/getall:
 *   get:
 *     summary: Get all mentees
 *     tags: [Mentee]
 *     responses:
 *       200:
 *         description: List of all mentees
 *       404:
 *         description: No mentees found
 *       500:
 *         description: Internal server error
 */
MenteeRouter.get("/getall", GetAllMentee);

/**
 * @swagger
 * /mentee/getamentee/{id}:
 *   get:
 *     summary: Get a mentee by ID
 *     tags: [Mentee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mentee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mentee fetched successfully
 *       404:
 *         description: Mentee not found
 *       500:
 *         description: Internal server error
 */
MenteeRouter.get("/getamentee/:id", GetMenteeById);

export default MenteeRouter;