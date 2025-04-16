// routes/adminRoutes.js
import { Router } from "express";
import {
  getUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/AdminControllers.js";
import { Protect, isAdmin } from "../middlewares/authMiddleware.js";
import { rateLimiter } from "../utils/rateLimiter.js";
const AdminRouter = Router();

AdminRouter.get("/allUsers", Protect, isAdmin, getUsers);
AdminRouter.put("/userDelete", rateLimiter,  Protect, isAdmin, deleteUser);
AdminRouter.put("/userUpdate", rateLimiter, Protect, isAdmin, updateUserRole);

export default AdminRouter;
