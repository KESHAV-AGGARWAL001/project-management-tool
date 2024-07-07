import express from "express";
import { sendMessage } from "../controllers/MessageController.js";

const MessageRouter = express.Router();

MessageRouter.post("/sendMessage", sendMessage);

export default MessageRouter;
