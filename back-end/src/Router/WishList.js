import e from "express";
import { AddMentorToWishList } from "../Controller/Mentee.js";
import { Auth } from "../middleWear/Auth.js";
const WishListRouter = e.Router();
WishListRouter.post("/savenunsave", Auth, AddMentorToWishList);
export default WishListRouter;
