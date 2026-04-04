import express from "express";
import { Auth } from "../middleWear/Auth.js";
import {
  createPerformance,
  getPerformanceOfAllMenteeInATask,
} from "../Controller/Performance.js";

const PerformanceRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Performance
 *   description: Performance APIs
 */

/**
 * @swagger
 * /performance/createscore:
 *   post:
 *     summary: Create or update performance score
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - totalquestion
 *               - correctanswer
 *               - wronganswer
 *               - score
 *               - mentee
 *               - task
 *             properties:
 *               totalquestion:
 *                 type: number
 *               correctanswer:
 *                 type: number
 *               wronganswer:
 *                 type: number
 *               score:
 *                 type: number
 *               mentee:
 *                 type: string
 *               task:
 *                 type: string
 *     responses:
 *       201:
 *         description: Performance created or updated successfully
 *       400:
 *         description: Missing fields
 *       403:
 *         description: Operation failed
 */
PerformanceRouter.post("/createscore", Auth, createPerformance);

/**
 * @swagger
 * /performance/getallperformanceofatask:
 *   post:
 *     summary: Get all mentee performance for a specific task
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskid
 *             properties:
 *               taskid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Performance list fetched successfully
 *       404:
 *         description: Task ID missing
 *       403:
 *         description: Could not fetch performance
 */
PerformanceRouter.post(
  "/getallperformanceofatask",
  Auth,
  getPerformanceOfAllMenteeInATask
);

export default PerformanceRouter;