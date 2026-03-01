import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
export const PaymentOrderCreate = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.API_Id_RAZOR,
      key_secret: process.env.API_KEY_RAZOR,
    });
    const { amount, currency } = req.body;
    const options = {
      amount: amount,
      currency: currency || "INR",
      receipt: `receipt_order ${Date.now()}`,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    if (order) {
      return res.status(201).json({
        success: true,
        order,
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: "filed to create order ",
      success: false,
    });
  }
};
