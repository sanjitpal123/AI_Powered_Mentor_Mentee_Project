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
import Task from "../Model/Task.js";

const TaskRouter = e.Router();
TaskRouter.post("/create", Auth, createTask);
TaskRouter.get("/gettask", Auth, GetAllTaskOfASpecificUser);
TaskRouter.get("/getbyid/:id", Auth, GetTaskById);
TaskRouter.put("/attend", Auth, AttendedBy);
TaskRouter.post("/getperformance", Auth, getPerformanceOfAMentee);
TaskRouter.put("/deleteexpiretask", Auth, DeleteExpireTaskFromMenteeProfile);
export default TaskRouter;
