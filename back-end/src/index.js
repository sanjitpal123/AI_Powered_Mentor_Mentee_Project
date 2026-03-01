import express from "express";
import Connection from "./config/DbConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import MainRouter from "./Router/index.js";
import http from "http";
import { Server } from "socket.io";
import { SocketServer } from "./Utils/socketFunction.js";
import { LoadDocument } from "./Utils/load.js";
// import { IndexMentor } from "./Controller/AiController.js";
// import { initChroma } from "./Utils/ChromaDb.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import path from "path";

const filePath = path.join(
  process.cwd(),
  "Mentor_Mentee_RAG_KB_Sanjit_Pal.pdf",
);

// import waitPort from "wait-port";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
// await waitPort({ host: "localhost", port: 8000, timeout: 10000 });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", MainRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at", process.env.PORT || 5000);
  Connection();
  LoadDocument(filePath);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true, // ✅ lowercase
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  SocketServer(socket, io);
});
