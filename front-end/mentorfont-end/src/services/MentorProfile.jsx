import axios from "axios";
import axiosInstance from "./AxiosInstance";

export const GetMentorProfile = async (id) => {
  try {
    console.log("token in mentorprofile", id);
    const res = await axiosInstance.post("/mentor/getmentorprofile", { id });
    return res.data;
  } catch (error) {
    throw error;
  }
};
