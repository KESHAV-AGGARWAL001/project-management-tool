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
const userRouter = Router();

userRouter.get("/profile", Protect, getUserProfile);
userRouter.post("/resetPassword/:id/:token", resetPassword);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/updateUser", Protect, updateUserProfile);
userRouter.get("/checkProfile", Protect, checkUserPresentOrNot);

export default userRouter;
