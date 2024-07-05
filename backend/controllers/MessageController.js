import asyncHandler from "express-async-handler";
import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content, senderId } = req.body;

  if (!chatId || !content || !senderId) {
    res
      .status(400)
      .json({ message: "Chat ID, content, and sender ID are required" });
    return;
  }

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).json({ message: "Chat not found" });
      return;
    }

    if (chat.members.length < 2) {
      res
        .status(400)
        .json({ message: "At least 2 members are required to send messages" });
      return;
    }

    const message = new Message({
      chat: chatId,
      content,
      sender: senderId,
    });

    const createdMessage = await message.save();
    chat.messages.push(createdMessage._id);
    chat.latestMessage = createdMessage._id; // Update latest message
    await chat.save();

    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const markMessageAsRead = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const { userId } = req.body;

  if (!messageId || !userId) {
    res.status(400).json({ message: "Message ID and User ID are required" });
    return;
  }

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    if (!message.readBy.includes(userId)) {
      message.readBy.push(userId);
      await message.save();
    }

    res.status(200).json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const { content, userId } = req.body;

  if (!messageId || !content || !userId) {
    res
      .status(400)
      .json({ message: "Message ID, content, and User ID are required" });
    return;
  }

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    if (message.sender.toString() !== userId) {
      res
        .status(403)
        .json({ message: "User not authorized to edit this message" });
      return;
    }

    message.content = content;
    message.updatedAt = Date.now();

    const updatedMessage = await message.save();
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { sendMessage, markMessageAsRead, updateMessage };
