import express from "express";
import { sendMessage } from "../controllers/MessageController.js";
import { rateLimiter } from "../utils/rateLimiter.js";

const MessageRouter = express.Router();

MessageRouter.post("/sendMessage" , rateLimiter, sendMessage);

export default MessageRouter;
