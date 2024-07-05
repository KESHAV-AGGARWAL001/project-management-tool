import express from "express";
import {
  getProjectReport,
  getUserTasksReport,
} from "../controllers/ReportControllers.js";

import { isManager, Protect } from "../middlewares/authMiddleware.js";

const ReportRouter = express.Router();

ReportRouter.get("/projectReport", Protect, isManager, getProjectReport);
ReportRouter.get("/userReport", Protect, isManager, getUserTasksReport);

export default ReportRouter;
