import e from "express";
import {
  AttendedBy,
  createTask,
  DeleteExpireTaskFromMenteeProfile,
  GetAllTaskOfASpecificUser,
  GetTaskById,
} from "../Controller/Task.js";
import { Auth } from "../middleWear/Auth.js";
import { getPerformanceOfAMentee } from "../Controller/Performance.js";

const TaskRouter = e.Router();

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task Management APIs
 */

/**
 * @swagger
 * /task/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Title
 *               - Description
 *               - Duedate
 *             properties:
 *               Title:
 *                 type: string
 *               Description:
 *                 type: string
 *               Duedate:
 *                 type: string
 *               Questions:
 *                 type: array
 *                 items:
 *                   type: string
 *               Mentees:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       403:
 *         description: Could not create task
 */
TaskRouter.post("/create", Auth, createTask);

/**
 * @swagger
 * /task/gettask:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       404:
 *         description: No tasks found
 */
TaskRouter.get("/gettask", Auth, GetAllTaskOfASpecificUser);

/**
 * @swagger
 * /task/getbyid/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Task]
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
 *         description: Task fetched successfully
 *       404:
 *         description: Task not found
 */
TaskRouter.get("/getbyid/:id", Auth, GetTaskById);

/**
 * @swagger
 * /task/attend:
 *   put:
 *     summary: Mark task as attended by mentee
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task_id
 *               - AttendedBy
 *             properties:
 *               task_id:
 *                 type: string
 *               AttendedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       403:
 *         description: Update failed
 */
TaskRouter.put("/attend", Auth, AttendedBy);

/**
 * @swagger
 * /task/getperformance:
 *   post:
 *     summary: Get performance of a mentee for a task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               mentee:
 *                 type: string
 *               task:
 *                 type: string
 *     responses:
 *       200:
 *         description: Performance fetched successfully
 *       404:
 *         description: Performance not found
 */
TaskRouter.post("/getperformance", Auth, getPerformanceOfAMentee);

/**
 * @swagger
 * /task/deleteexpiretask:
 *   put:
 *     summary: Remove expired task from mentee profile
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               taskId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task removed successfully
 *       403:
 *         description: Could not delete task
 */
TaskRouter.put("/deleteexpiretask", Auth, DeleteExpireTaskFromMenteeProfile);

export default TaskRouter;