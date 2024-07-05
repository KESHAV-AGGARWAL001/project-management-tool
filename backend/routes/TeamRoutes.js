import express from "express";
import { createTeam, joinTeam } from "../controllers/TeamControllers.js";
import { Protect, isManager } from "../middlewares/authMiddleware.js";

const TeamRouter = express.Router();

TeamRouter.post("/createTeam", Protect, isManager, createTeam);
TeamRouter.get("/invite/:token", joinTeam);

export default TeamRouter;
