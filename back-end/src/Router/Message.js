import express from "express";
import {
  DeleteForEveryone,
  DeleteForMe,
  DeleteMessage,
  EditMessage,
  GetUserMessage,
  SeenMessage,
  SendMessage,
} from "../Controller/Message.js";
import { Auth } from "../middleWear/Auth.js";
const MessageRouter = express.Router();
MessageRouter.post("/", Auth, SendMessage);
MessageRouter.delete("/deletemessage/:id", Auth, DeleteMessage);
MessageRouter.put("/editmessage/:id", Auth, EditMessage);
MessageRouter.post("/getconvomessage", Auth, GetUserMessage);
MessageRouter.post("/mark_seen", Auth, SeenMessage);
MessageRouter.delete("/deleteforeveryone/:id", DeleteForEveryone);
MessageRouter.delete("/deleteforme/:id", Auth, DeleteForMe);

export default MessageRouter;
