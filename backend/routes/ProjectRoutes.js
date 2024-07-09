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
const ProjectRouter = Router();

ProjectRouter.post("/postNewProject", Protect, isManager, createProject);
ProjectRouter.delete("/deleteAProject/:id", Protect, isManager, deleteProject);
ProjectRouter.put("/updateProject/:id", Protect, isManager, updateProject);
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
