import axios from "axios";
import axiosInstance from "./AxiosInstance";

async function SendMessageAndGetAnswer(query, token) {
  try {
    const response = await axiosInstance.post(
      "ai-features/askfromagentic",
      { query },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export default SendMessageAndGetAnswer;
