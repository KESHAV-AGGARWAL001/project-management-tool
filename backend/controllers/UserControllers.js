import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Not all fields have been entered");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ email: req.query.userEmail }).select(
      "-password"
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(201).json({ message: "Not present" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

const checkUserPresentOrNot = asyncHandler(async (req, res) => {
  // console.log(req);
  const { email } = req.query;
  try {
    // console.log("request params for email  :->", req.query);
    if (!email) {
      return res.json({
        success: false,
        message: "No email is send from frontend",
      });
    }

    const user = await User.find({ email });
    // console.log("user data at backend on fetching ", user);
    if (!user) {
      return res.json({ success: false });
    }
    return res.json({ success: true, user });
  } catch (error) {
    res.json({ message: error.message });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = generateToken(user._id);
      res.json({
        message: "token is present",
        data: { id: user._id, token },
      });
    } else {
      res.json({ message: "not found user" });
    }
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  if (!id || !token) {
    res.status(404);
    throw new Error("Id or token is not present");
  }

  try {
    // finding the user
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const { password } = req.body;
    // verifying the token we get

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyToken);
    if (!verifyToken) {
      res.status(403).send("Invalid token");
    }

    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password reset successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { id, name } = req.body;
  const user = await User.findById(id);

  if (user) {
    if (name) user.name = name;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  forgotPassword,
  getUserProfile,
  loginUser,
  registerUser,
  resetPassword,
  updateUserProfile,
  checkUserPresentOrNot,
};
