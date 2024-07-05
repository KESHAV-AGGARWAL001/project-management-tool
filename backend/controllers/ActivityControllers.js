// controllers/activityController.js
import asyncHandler from "express-async-handler";
import Activity from "../models/ActivityModel.js";

const logActivity = asyncHandler(async (activity) => {
  try {
    const act = new Activity({
      projectId: activity.projectId,
      user: activity.userId,
      action: activity.action,
      details: activity.details,
    });
    await act.save();
  } catch (error) {
    console.log(error);
  }
});

const getActivityLog = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const activities = await Activity.find({ projectId })
    .populate("user")
    .sort({ createdAt: -1 });

  res.json(activities);
});

export { logActivity, getActivityLog };
