import express from "express";
import {
  createChat,
  getChatsForProject,
} from "../controllers/ChatControllers.js";
import { isManager } from "../middlewares/authMiddleware.js";

const ChatRouter = express.Router();

ChatRouter.post("/create", isManager, createChat);
ChatRouter.get("/project/:projectId", getChatsForProject);

export default ChatRouter;
