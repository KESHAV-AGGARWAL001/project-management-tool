import express from "express";
import {
  createChat,
  getChatsForProject,
} from "../controllers/ChatControllers.js";
import { isManager } from "../middlewares/authMiddleware.js";
import { rateLimiter } from "../utils/rateLimiter.js";

const ChatRouter = express.Router();

ChatRouter.post("/create", rateLimiter, isManager, createChat);
ChatRouter.get("/project/:projectId", getChatsForProject);

export default ChatRouter;
