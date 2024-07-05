// controllers/adminController.js
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({ role: "user" });
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.headers.id;
  const user = await User.findById(id);
  try {
    if (!user) {
      throw new Error("User not found");
    }
    if (user) {
      await User.findByIdAndDelete(user._id);
      res.json({ message: "User removed" });
    }
  } catch (error) {
    res.json({ message: "error", error });
  }
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { id, role } = req.body;
  const user = await User.findById(id);

  try {
    if (user) {
      user.role = role || user.role;
      const updatedUser = await user.save();
      res.json({ message: "User role updated", updatedUser });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(401).json({
      message: "some error occurred in updating the role of any user",
      error,
    });
  }
});

export { getUsers, deleteUser, updateUserRole };
