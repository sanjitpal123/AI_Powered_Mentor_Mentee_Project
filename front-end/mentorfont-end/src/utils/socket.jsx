import { io } from "socket.io-client";

export const socket = io(
  "https://ai-powered-mentor-mentee-project-6.onrender.com",
  {
    transports: ["websocket"], // 🔥 MUST ADD
    withCredentials: true,
  },
);
