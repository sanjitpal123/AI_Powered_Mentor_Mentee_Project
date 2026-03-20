import express from "express";
import {
  CancelledSessions,
  CreateSession,
  GetAllSession,
  GetASession,
  Reschedule,
  searchSession,
  SearchSessionByCategory,
  UpdateASession,
} from "../Controller/SessionBooking.js";
import { Auth } from "../middleWear/Auth.js";

const SessionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session management APIs
 */

/**
 * @swagger
 * /session/create:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentor
 *               - date
 *               - topic
 *               - notes
 *             properties:
 *               mentor:
 *                 type: string
 *               date:
 *                 type: string
 *               topic:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session created successfully
 */
SessionRouter.post("/create", Auth, CreateSession);

/**
 * @swagger
 * /session/getbyid/{id}:
 *   get:
 *     summary: Get session by ID
 *     tags: [Sessions]
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
 *         description: Session fetched successfully
 */
SessionRouter.get("/getbyid/:id", Auth, GetASession);

/**
 * @swagger
 * /session/reschedule/{id}:
 *   put:
 *     summary: Reschedule a session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentor:
 *                 type: string
 *               date:
 *                 type: string
 *               topic:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session rescheduled
 */
SessionRouter.put("/reschedule/:id", Reschedule);

/**
 * @swagger
 * /session/cancelled/{id}:
 *   post:
 *     summary: Cancel a session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Session cancelled
 */
SessionRouter.post("/cancelled/:id", CancelledSessions);

/**
 * @swagger
 * /session/updatesession:
 *   post:
 *     summary: Update session status
 *     tags: [Sessions]
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
 *               status:
 *                 type: string
 *               mentor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session updated
 */
SessionRouter.post("/updatesession", Auth, UpdateASession);

/**
 * @swagger
 * /session/getallsession:
 *   get:
 *     summary: Get all sessions of logged-in user
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All sessions fetched
 */
SessionRouter.get("/getallsession", Auth, GetAllSession);

/**
 * @swagger
 * /session/search:
 *   post:
 *     summary: Search sessions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sessions found
 */
SessionRouter.post("/search", Auth, searchSession);

/**
 * @swagger
 * /session/searchbycategory:
 *   post:
 *     summary: Search sessions by category
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sessions fetched by category
 */
SessionRouter.post("/searchbycategory", Auth, SearchSessionByCategory);

export default SessionRouter;