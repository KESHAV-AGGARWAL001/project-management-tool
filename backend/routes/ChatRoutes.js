import express from "express";
import {
  createChat,
  getChatHistory,
  getChatsForProject,
} from "../controllers/ChatControllers.js";
import {
  markMessageAsRead,
  sendMessage,
  updateMessage,
} from "../controllers/MessageController.js";

const ChatRouter = express.Router();

ChatRouter.post("/create", createChat);
ChatRouter.post("/send", sendMessage);
ChatRouter.post("/read/:messageId", markMessageAsRead);
ChatRouter.put("/update/:messageId", updateMessage);
ChatRouter.get("/project/:projectId", getChatsForProject);
ChatRouter.get("/getHistory/:chatId", getChatHistory);

export default ChatRouter;
