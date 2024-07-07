import asyncHandler from "express-async-handler";
import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content, senderId } = req.body;
  // console.log("chatId : ", chatId);
  // console.log("Content : ", content);
  // console.log("senderId : ", senderId);
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

    const message = new Message({
      chatId,
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

export { sendMessage };
