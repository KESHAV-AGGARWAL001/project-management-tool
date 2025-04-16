// routes/notificationRoutes.js
import express from "express";
import { Protect } from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";
import { rateLimiter } from "../utils/rateLimiter.js";

const NotificationRouter = express.Router();

NotificationRouter.get("/getNotification", Protect, getNotifications);
NotificationRouter.put("/markNotification/:id", rateLimiter, Protect, markAsRead);

export default NotificationRouter;
