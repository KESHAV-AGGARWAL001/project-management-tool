// controllers/notificationController.js
import asyncHandler from "express-async-handler";
import Notification from "../models/NotificationModel.js";

// Create a new notification
const createNotification = asyncHandler(async (userId, message) => {
  const notification = new Notification({
    user: userId,
    message,
  });

  await notification.save();
});

// Get all notifications for a user
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const notifications = await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });
  res.json(notifications);
});

// Mark a notification as read
const markAsRead = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.read = true;
  await notification.save();

  res.json(notification);
});

export { createNotification, getNotifications, markAsRead };
