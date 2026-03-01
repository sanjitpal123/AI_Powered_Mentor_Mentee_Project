import express from "express";
import { SearchMentor } from "../Controller/UserController.js";
import {
  FilterMentor,
  FilterPriceLowToHigh,
  GetAllMentos,
  GetMentorByIdCon,
  GetMentorProfile,
} from "../Controller/Mentor.js";
import { Auth } from "../middleWear/Auth.js";

const MentorRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mentor
 *   description: Mentor management APIs
 */

console.log("✅ Mentor router loaded");

/**
 * @swagger
 * /mentor/ping:
 *   get:
 *     summary: Check if mentor router is working
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: Mentor router working
 */
MentorRouter.get("/ping", (req, res) => {
  res.send("Mentor router is working");
});

/**
 * @swagger
 * /mentor/allmentor:
 *   get:
 *     summary: Get all mentors
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: List of mentors
 */
MentorRouter.get("/allmentor", GetAllMentos);

/**
 * @swagger
 * /mentor/search:
 *   post:
 *     summary: Search mentors by query
 *     tags: [Mentor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 example: "React developer"
 *     responses:
 *       200:
 *         description: Search result
 */
MentorRouter.post("/search", SearchMentor);

/**
 * @swagger
 * /mentor/filtermentor:
 *   post:
 *     summary: Filter mentors by skill and price
 *     tags: [Mentor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skill:
 *                 type: string
 *                 example: "Node.js"
 *               price:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Filtered mentors
 */
MentorRouter.post("/filtermentor", FilterMentor);

/**
 * @swagger
 * /mentor/lowtohigh:
 *   get:
 *     summary: Sort mentors by price low to high
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: Sorted mentors
 */
MentorRouter.get("/lowtohigh", FilterPriceLowToHigh);

/**
 * @swagger
 * /mentor/getmentorprofile:
 *   post:
 *     summary: Get mentor profile
 *     tags: [Mentor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorId:
 *                 type: string
 *                 example: "65f1c8c2a2b4c9a123456789"
 *     responses:
 *       200:
 *         description: Mentor profile data
 */
MentorRouter.post("/getmentorprofile", Auth, GetMentorProfile);

/**
 * @swagger
 * /mentor/getmentorbyid:
 *   post:
 *     summary: Get mentor by ID
 *     tags: [Mentor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "65f1c8c2a2b4c9a123456789"
 *     responses:
 *       200:
 *         description: Mentor details
 */
MentorRouter.post("/getmentorbyid", GetMentorByIdCon);

export default MentorRouter;
