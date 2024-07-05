// routes/adminRoutes.js
import { Router } from "express";
import {
  getUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/AdminControllers.js";
import { Protect, isAdmin } from "../middlewares/authMiddleware.js";
const AdminRouter = Router();

AdminRouter.get("/allUsers", Protect, isAdmin, getUsers);
AdminRouter.put("/userDelete", Protect, isAdmin, deleteUser);
AdminRouter.put("/userUpdate", Protect, isAdmin, updateUserRole);

export default AdminRouter;
