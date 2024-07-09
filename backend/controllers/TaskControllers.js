import asyncHandler from "express-async-handler";
import Task from "../models/TaskModel.js";
import { logActivity } from "./ActivityControllers.js";

const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    status,
    assignedTo,
    projectId,
    dueDate,
    createdBy,
  } = req.body;

  console.log(req.body);
  try {
    const task = new Task({
      title,
      description,
      status,
      assignedTo,
      projectId,
      dueDate,
      createdBy,
    });

    const createdTask = await task.save();
    const activity = {
      projectId: createdTask.projectId,
      userId: createdBy,
      action: "created",
      details: `Task is created successfully`,
    };
    logActivity(activity);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getTasksByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  try {
    const tasks = await Task.find({ projectId })
      .populate("assignedTo", "email")
      .populate();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getTasksAssignedToPerson = asyncHandler(async (req, res) => {
  const teamMemberId = req.body.id;
  if (!teamMemberId)
    return res.status(401).json({ message: "Invalid team member" });
  try {
    const tasks = await Task.find({ assignedTo: teamMemberId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.headers.task;
  const { title, description, status, assignedTo, dueDate } = req.body;
  try {
    const task = await Task.findById(taskId);

    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.assignedTo = assignedTo || task.assignedTo;
      task.dueDate = dueDate || task.dueDate;

      const updatedTask = await task.save();
      const activity = {
        projectId: task.projectId,
        userId: req.user._id,
        action: "updated",
        details: `Task is updated successfully`,
      };
      logActivity(activity);

      createNotification(
        task.assignedTo,
        `Task is updated . Please check once`
      );

      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.headers.task;
  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (task) {
      logActivity(
        task.projectId,
        req.user._id,
        "Task Deleted",
        `Task "${title}" Deleted successfully`
      );
      res.status(200).json({ message: "Task removed" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  getTasksAssignedToPerson,
};
