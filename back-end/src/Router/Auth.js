import e from "express";
import { Login, Signup } from "../Controller/UserController.js";

const AuthRouter = e.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *               - skills
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sanjit Pal
 *               email:
 *                 type: string
 *                 example: sanjit@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               bio:
 *                 type: string
 *                 example: MERN stack developer
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "Node"]
 *               role:
 *                 type: string
 *                 example: mentee
 *               linked:
 *                 type: string
 *                 example: https://linkedin.com/in/sanjit
 *               github:
 *                 type: string
 *                 example: https://github.com/sanjit
 *               price:
 *                 type: number
 *                 example: 500
 *               experience:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: User registered
 *       401:
 *         description: Missing fields
 */
AuthRouter.post("/signup", Signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: sanjit@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
AuthRouter.post("/login", Login);

export default AuthRouter;
