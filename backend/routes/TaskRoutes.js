import { Router } from "express";
import { Protect, isManager } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  getTasksAssignedToPerson,
} from "../controllers/TaskControllers.js";

const TaskRouter = Router();

TaskRouter.get(
  "/getAllTasks/:projectId",
  Protect,
  isManager,
  getTasksByProject
);
TaskRouter.post("/createTask", Protect, isManager, createTask);
TaskRouter.put("/updateTask", Protect, isManager, updateTask);
TaskRouter.delete("/deleteTask", Protect, isManager, deleteTask);
TaskRouter.get("/getMyTasks", Protect, getTasksAssignedToPerson);

export default TaskRouter;
