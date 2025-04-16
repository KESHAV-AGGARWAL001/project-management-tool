import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ActivityRouter from "./routes/ActivityRoutes.js";
import AdminRouter from "./routes/AdminRoutes.js";
import ChatRouter from "./routes/ChatRoutes.js";
import MessageRouter from "./routes/MessageRoutes.js";
import ProjectRouter from "./routes/ProjectRoutes.js";
import ReportRouter from "./routes/ReportRoutes.js";
import TaskRouter from "./routes/TaskRoutes.js";
import TeamRouter from "./routes/TeamRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import { default as DbConnection } from "./utils/DbConnection.js";

config();

const app = express();
const server = createServer(app);

app.set("trust proxy", true);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Default connection", socket.id);

  socket.on("join-room", (roomId) => {
    // console.log("Room with id: " + roomId + " joined");
    socket.join(roomId);
  });

  socket.on("send-message", (message, projectId) => {
    // console.log(message);
    // console.log("project id -> ", projectId);
    io.to(projectId).emit("newMessage", message);
  });

  socket.on("add-member", (message, projectId, memberId) => {
    console.log(message);
    io.to(projectId).except(memberId).emit("newMessage", message);
  });
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
DbConnection();

app.use("/api/user", userRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/project", ProjectRouter);
app.use("/api/task", TaskRouter);
app.use("/api/team", TeamRouter);
app.use("/api/activity", ActivityRouter);
app.use("/api/report", ReportRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/messages", MessageRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
