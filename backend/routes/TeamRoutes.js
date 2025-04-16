import express from "express";
import { createTeam, joinTeam } from "../controllers/TeamControllers.js";
import { Protect, isManager } from "../middlewares/authMiddleware.js";
import { rateLimiter } from "../utils/rateLimiter.js";

const TeamRouter = express.Router();

TeamRouter.post("/createTeam", rateLimiter, Protect, isManager, createTeam);
TeamRouter.get("/invite/:token", joinTeam);

export default TeamRouter;
