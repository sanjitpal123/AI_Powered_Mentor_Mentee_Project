import axios from "axios";
import axiosInstance from "./AxiosInstance";
async function LoginService(data) {
  try {
    console.log("error", data);
    const res = await axiosInstance.post("auth/login", data);
    console.log("reslogin", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default LoginService;
