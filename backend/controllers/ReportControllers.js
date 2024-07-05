// controllers/reportController.js
import asyncHandler from "express-async-handler";
import Project from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";

const getProjectReport = asyncHandler(async (req, res) => {
  const projectId = req.headers.id;
  try {
    const project = await Project.findById(projectId).populate("members");

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    const tasks = await Task.find({ projectId });

    const completedTasks = tasks.filter(
      (task) => task.status === "complete"
    ).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    const report = {
      project,
      totalTasks,
      completedTasks,
      progress,
    };
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getUserTasksReport = asyncHandler(async (req, res) => {
  const userId = req.headers.id;
  try {
    const tasks = await Task.find({ assignedTo: userId });

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    const report = {
      user: userId,
      totalTasks,
      completedTasks,
      progress,
    };

    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getProjectReport, getUserTasksReport };
