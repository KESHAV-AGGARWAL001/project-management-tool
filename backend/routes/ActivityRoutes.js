// routes/activityRoutes.js
import { Router } from "express";
import { getActivityLog } from "../controllers/ActivityControllers.js";
import { Protect } from "../middlewares/authMiddleware.js";

const ActivityRouter = Router();

ActivityRouter.get("/getLogOfActivities", Protect, getActivityLog);

export default ActivityRouter;
