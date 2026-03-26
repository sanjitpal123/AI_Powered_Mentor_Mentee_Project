import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ai-powered-mentor-mentee-project-6.onrender.com/api/v1",
});

export default axiosInstance;
