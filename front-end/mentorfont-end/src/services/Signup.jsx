import axios from "axios";
import axiosInstance from "./AxiosInstance";
async function singup(formdata) {
  try {
    console.log("data", formdata);
    const res = await axiosInstance.post("auth/singup", formdata);
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default singup;
