import { taskController } from "@/controllers/task.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/projects");

app.get("/:id/tasks", taskController.get);
app.get("/:id/tasks/:taskId", taskController.getById);
app.put("/:id/tasks/:taskId/status/toggle", taskController.toggleStatus);
app.post("/:id/tasks/create", taskController.post);

export default app;
