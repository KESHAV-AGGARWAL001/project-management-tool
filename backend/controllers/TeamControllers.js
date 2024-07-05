import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Team from "../models/TeamModel.js";
import User from "../models/UserModel.js";
const createTeam = asyncHandler(async (req, res) => {
  const { teamName, description, createdBy } = req.body;

  try {
    const team = new Team({
      teamName,
      description,
      createdBy,
      members: [createdBy],
    });

    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const joinTeam = asyncHandler(async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, teamId } = decoded;

    const team = await Team.findById(teamId);
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!team.members.includes(user._id)) {
      team.members.push(user._id);
      await team.save();
      res
        .status(200)
        .json({ message: "You have successfully joined the team" });
    } else {
      res
        .status(400)
        .json({ message: "You are already a member of this team" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { createTeam, joinTeam };
