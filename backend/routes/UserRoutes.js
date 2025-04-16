import { Router } from "express";
import {
  checkUserPresentOrNot,
  forgotPassword,
  getUserProfile,
  loginUser,
  registerUser,
  resetPassword,
  updateUserProfile,
} from "../controllers/UserControllers.js";
import { Protect } from "../middlewares/authMiddleware.js";
import { rateLimiter } from "../utils/rateLimiter.js";
const userRouter = Router();

userRouter.get("/profile", Protect, getUserProfile);
userRouter.post("/resetPassword/:id/:token", rateLimiter, resetPassword);
userRouter.post("/register", rateLimiter, registerUser);
userRouter.post("/login", rateLimiter, loginUser);
userRouter.post("/forgotPassword", rateLimiter, forgotPassword);
userRouter.post("/updateUser", rateLimiter, Protect, updateUserProfile);
userRouter.get("/checkProfile", Protect, checkUserPresentOrNot);

export default userRouter;
