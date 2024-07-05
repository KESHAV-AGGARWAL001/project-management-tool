import { config } from "dotenv";
import express, { urlencoded } from "express";
import { default as DbConnection } from "./utils/DbConnection.js";
import userRouter from "./routes/UserRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import AdminRouter from "./routes/AdminRoutes.js";
import ProjectRouter from "./routes/ProjectRoutes.js";
import TaskRouter from "./routes/TaskRoutes.js";
import TeamRouter from "./routes/TeamRoutes.js";
import ActivityRouter from "./routes/ActivityRoutes.js";
import ReportRouter from "./routes/ReportRoutes.js";
import ChatRouter from "./routes/ChatRoutes.js";

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
DbConnection();

app.use("/api/user", userRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/project", ProjectRouter);
app.use("/api/task", TaskRouter);
app.use("/api/team", TeamRouter);
app.use("/api/activity", ActivityRouter);
app.use("/api/report", ReportRouter);
app.use("/api/chat", ChatRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
