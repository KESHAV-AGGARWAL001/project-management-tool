// routes/notificationRoutes.js
import express from "express";
import { Protect } from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const NotificationRouter = express.Router();

NotificationRouter.get("/getNotification", Protect, getNotifications);
NotificationRouter.put("/markNotification/:id", Protect, markAsRead);

export default NotificationRouter;
