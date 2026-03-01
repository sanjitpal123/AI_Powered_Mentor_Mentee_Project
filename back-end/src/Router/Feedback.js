import e from "express";
import { Auth } from "../middleWear/Auth.js";
import { CreateFeedBack } from "../Controller/Feedback.js";

const FeedbackRouter = e.Router();
FeedbackRouter.post("/create", Auth, CreateFeedBack);
export default FeedbackRouter;
