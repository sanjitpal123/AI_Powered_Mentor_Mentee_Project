import express from "express";
import { PaymentOrderCreate } from "../Controller/Payments.js";
const PaymentRouter = express.Router();
PaymentRouter.post("/order", PaymentOrderCreate);
export default PaymentRouter;
