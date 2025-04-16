import { Router } from "express";
import { Protect, isManager } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  getTasksAssignedToPerson,
} from "../controllers/TaskControllers.js";
import { rateLimiter } from "../utils/rateLimiter.js";

const TaskRouter = Router();

TaskRouter.get("/getAllTasks", Protect, isManager, getTasksByProject);
TaskRouter.post("/createTask", rateLimiter, Protect, isManager, createTask);
TaskRouter.put("/updateTask", rateLimiter, Protect, isManager, updateTask);
TaskRouter.delete("/deleteTask", rateLimiter, Protect, isManager, deleteTask);
TaskRouter.get("/getMyTasks", Protect, getTasksAssignedToPerson);

export default TaskRouter;
