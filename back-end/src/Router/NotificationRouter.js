import e from "express";
import {
  CreateNotice,
  GetAUserNotification,
  UpdateIsRead,
} from "../Controller/Notification.js";
import { Auth } from "../middleWear/Auth.js";

const NotificationRouter = e.Router();
NotificationRouter.post("/create", Auth, CreateNotice);
NotificationRouter.get("/getnotfication", Auth, GetAUserNotification);
NotificationRouter.put("/update-isread", Auth, UpdateIsRead);

export default NotificationRouter;
