import express from "express";
import { GetAllMentee, GetMenteeById } from "../Controller/Mentee.js";

const MenteeRouter = express.Router();
MenteeRouter.get("/getall", GetAllMentee);
MenteeRouter.get("/getamentee/:id", GetMenteeById);

export default MenteeRouter;
