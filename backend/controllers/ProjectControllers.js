// controllers/projectController.js
import asyncHandler from "express-async-handler";
import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";
import { logActivity } from "./ActivityControllers.js";
import { createNotification } from "./NotificationControllers.js";

const createProject = asyncHandler(async (req, res) => {
  const { projectName, description, members, deadline, createdBy } = req.body;
  try {
    const project = new Project({
      projectName,
      description,
      members,
      createdBy,
      deadline,
    });

    const createdProject = await project.save();
    const activity = {
      projectId: createdProject._id,
      userId: createdBy,
      action: "createdProject",
      details: `New Project is created successfully`,
    };
    logActivity(activity);
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      res.status(404);
      throw new Error("Id is not present");
    }
    const project = await Project.findById(projectId);
    if (project) {
      await Project.findByIdAndDelete(projectId);
      const activity = {
        projectId: project._id,
        userId: project.createdBy,
        action: "deleteProject",
        details: `Project is deleted successfully`,
      };
      logActivity(activity);
      project.members.forEach((userId) => {
        createNotification(
          userId,
          `Task is deleted. Thanks for working on this project `
        );
      });
      res.json({ message: "Project removed" });
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectName, description, members, deadline } = req.body;
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);

    if (project) {
      project.projectName = projectName || project.projectName;
      project.description = description || project.description;
      project.members = members || project.members;
      project.deadline = deadline || project.deadline;

      const updatedProject = await project.save();
      const activity = {
        projectId: project._id,
        userId: project.createdBy,
        action: "updateProject",
        details: `Project is updated successfully`,
      };
      logActivity(activity);
      project.members.forEach((userId) => {
        createNotification(userId, `Project is updated . Please check once`);
      });

      res.json(updatedProject);
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const addMemberToProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;

  if (!projectId || !memberId) {
    res.status(404);
    throw new Error("Project not found or member not found");
  }

  try {
    const project = await Project.findById(projectId);

    const member = await User.findById(memberId);

    if (project && member) {
      if (!project.members.includes(memberId)) project.members.push(memberId);
      else res.json({ message: "This member is already in the project" });
      const updatedProject = await project.save();
      const activity = {
        projectId: project._id,
        userId: project.createdBy,
        action: "addMemberToProject",
        details: `Member is added to project successfully`,
      };
      logActivity(activity);
      res.json(updatedProject);
    } else {
      res.status(404);
      throw new Error("Project not found or member not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const removeMemberFromProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.body.memberId;

  if (!projectId || !memberId) {
    res.status(404);
    throw new Error("Project not found or member not found");
  }

  try {
    const project = await Project.findById(projectId);

    const member = await User.findById(memberId);

    if (project && member) {
      if (!project.members.includes(member)) {
        res.status(201).json({ message: "Already not present" });
      } else {
        project.members = project.members.filter((id) => id !== memberId);

        createNotification(
          memberId,
          `Thanks for working for this task. Now this task is given to someone else`
        );

        res.json({ message: "Member removed from project successfully" });
      }
      const updatedProject = await project.save();
      const activity = {
        projectId: project._id,
        userId: project.createdBy,
        action: "removeMemberFromProject",
        details: `Member is removed to project successfully`,
      };
      logActivity(activity);
      res.json(updatedProject);
    } else {
      res.status(404);
      throw new Error("Project not found or member not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getProjectDetails = asyncHandler(async (req, res) => {
  const projectId = req.body.id;

  if (!projectId) {
    res.status(404);
    throw new Error("Project id  not found");
  }

  try {
    const project = await Project.findById(projectId).populate("members");
    if (project) {
      res.json(project);
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllMembersOfProject = asyncHandler(async (req, res) => {
  const projectId = req.body.id;
  if (!projectId) {
    res.status(404);
    throw new Error("Project id  not found");
  }

  try {
    const project = await Project.findById(projectId);
    if (project) {
      res.json(project.members);
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  createProject,
  deleteProject,
  updateProject,
  addMemberToProject,
  removeMemberFromProject,
  getProjectDetails,
  getAllMembersOfProject,
};