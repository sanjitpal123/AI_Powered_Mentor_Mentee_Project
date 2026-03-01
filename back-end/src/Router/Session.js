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
SessionRouter.post("/create", Auth, CreateSession);
SessionRouter.get("/getbyid/:id", Auth, GetASession);
SessionRouter.put("/reschedule/:id", Reschedule);
SessionRouter.post("/cancelled/:id", CancelledSessions);
SessionRouter.post("/updatesession", Auth, UpdateASession);
SessionRouter.get("/getallsession", Auth, GetAllSession);
SessionRouter.post("/search", Auth, searchSession);
SessionRouter.post("/searchbycategory", Auth, SearchSessionByCategory);
export default SessionRouter;
