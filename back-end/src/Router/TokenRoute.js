import express from "express";
import { GetAllToken } from "../Controller/Token.js";

const TokenRouter = express.Router();
TokenRouter.post("/get-all-tokens", GetAllToken);

export default TokenRouter;
