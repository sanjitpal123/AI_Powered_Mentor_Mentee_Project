import express from "express";
import { Auth } from "../middleWear/Auth.js";
import {
  createPerformance,
  getPerformanceOfAllMenteeInATask,
} from "../Controller/Performance.js";
const PerformanceRouter = express.Router();
PerformanceRouter.post("/createscore", Auth, createPerformance);
PerformanceRouter.post(
  "/getallperformanceofatask",
  Auth,
  getPerformanceOfAllMenteeInATask
);
export default PerformanceRouter;
