import express from "express";
import {
  Conversation,
  GetAllConvo,
  GetConversationByMentorId,
  GetConvoById,
  GetUserConvo,
} from "../Controller/Conversation.js";
import { Auth } from "../middleWear/Auth.js";
const ConvoRouter = express.Router();
ConvoRouter.post("/", Auth, Conversation);
ConvoRouter.post("/getconvobyid", Auth, GetConvoById);
ConvoRouter.get("/getuserconvo", Auth, GetUserConvo);
ConvoRouter.get("/getall", Auth, GetAllConvo);
ConvoRouter.post("/getconvobymentorid", Auth, GetConversationByMentorId);

export default ConvoRouter;
