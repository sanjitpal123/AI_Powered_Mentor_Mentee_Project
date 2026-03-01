import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1",
});

export default axiosInstance;
