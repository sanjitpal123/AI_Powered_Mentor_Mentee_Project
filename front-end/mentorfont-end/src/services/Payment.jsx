import axios from "axios";
import axiosInstance from "./AxiosInstance";
async function CreatePayment(data) {
  try {
    const res = await axiosInstance.post("/payment/order", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default CreatePayment;
