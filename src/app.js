import express, { json } from "express";
import morgan from "morgan";

// Importing routes
import projectRoutes from "./routes/projects";
import taskRoutes from "./routes/tasks";

// Initialization
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
