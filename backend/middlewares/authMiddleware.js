import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const Protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log(token);
    if (!token) {
      res.status(401).json({ message: "No token is available" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).send({ message: "No token is available" });
  }
  const decodedAdminId = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedAdminId)
    res.status(401).send({ message: "token is not correct" });

  const decodedAdmin = await User.findById(decodedAdminId.id);
  if (decodedAdmin && decodedAdmin.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

const isManager = asyncHandler(async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).send({ message: "No token is available" });
  }
  const decodedManagerId = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedManagerId)
    res.status(401).send({ message: "token is not correct" });

  const decodedManager = await User.findById(decodedManagerId.id);
  if (decodedManager && decodedManager.role === "manager") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an manager");
  }
});

export { Protect, isAdmin, isManager };
