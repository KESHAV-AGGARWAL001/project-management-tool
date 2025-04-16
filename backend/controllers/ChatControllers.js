import asyncHandler from "express-async-handler";
import Chat from "../models/ChatModel.js";

const createChat = asyncHandler(async (req, res) => {
  const { projectId, members } = req.body;

  if (!projectId || !members || !members.length) {
    res
      .status(400)
      .json({ message: "Project ID and participants are required" });
    return;
  }

  try {
    const chat = new Chat({ projectId, members });
    const createdChat = await chat.save();
    res.status(201).json(createdChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getChatsForProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    res.status(400).json({ message: "Project ID is required" });
    return;
  }

  try {
    const chats = await Chat.find({ projectId })
      .populate("members", "email")
      .populate("messages", "content")
      .populate("latestMessage");

    if (!chats) {
      res.status(404).json({ message: "No Chats available" });
      return;
    }

    // console.log(chats);
    res.status(200).json(chats);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export { createChat, getChatsForProject };
