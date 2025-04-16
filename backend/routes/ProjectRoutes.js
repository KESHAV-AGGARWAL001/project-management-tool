// routes/projectRoutes.js
import { Router } from "express";
import {
  addMemberToProject,
  checkProject,
  createProject,
  deleteProject,
  getAllMembersOfProject,
  getProjectDetails,
  updateProject,
} from "../controllers/ProjectControllers.js";
import { Protect, isManager } from "../middlewares/authMiddleware.js";
import { rateLimiter } from "../utils/rateLimiter.js";
const ProjectRouter = Router();

ProjectRouter.post("/postNewProject", rateLimiter, Protect, isManager, createProject);
ProjectRouter.delete("/deleteAProject/:id", rateLimiter, Protect, isManager, deleteProject);
ProjectRouter.put("/updateProject/:id", rateLimiter, Protect, isManager, updateProject);
ProjectRouter.post("/addNewMember/:id", Protect, isManager, addMemberToProject);
ProjectRouter.get("/getProjectDetails", Protect, isManager, getProjectDetails);
ProjectRouter.get(
  "/getProjectMembers/:projectId",
  Protect,
  isManager,
  getAllMembersOfProject
);
ProjectRouter.get("/checkProject/:projectId", Protect, checkProject);

export default ProjectRouter;
