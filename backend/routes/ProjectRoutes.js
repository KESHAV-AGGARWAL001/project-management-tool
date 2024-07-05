// routes/projectRoutes.js
import { Router } from "express";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getAllMembersOfProject,
  getProjectDetails,
  removeMemberFromProject,
  updateProject,
} from "../controllers/ProjectControllers.js";
import { Protect, isManager } from "../middlewares/authMiddleware.js";
const ProjectRouter = Router();

ProjectRouter.post("/postNewProject", Protect, isManager, createProject);
ProjectRouter.delete("/deleteAProject/:id", Protect, isManager, deleteProject);
ProjectRouter.put("/updateProject/:id", Protect, isManager, updateProject);
ProjectRouter.post("/addNewMember/:id", Protect, isManager, addMemberToProject);
ProjectRouter.post(
  "/removeMember/:id",
  Protect,
  isManager,
  removeMemberFromProject
);
ProjectRouter.get("/getProjectDetails", Protect, isManager, getProjectDetails);
ProjectRouter.get(
  "/getProjectMembers",
  Protect,
  isManager,
  getAllMembersOfProject
);

export default ProjectRouter;
