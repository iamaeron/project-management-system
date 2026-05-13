import { taskController } from "@/controllers/task.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/projects");

app.get("/:id/tasks", taskController.get);
app.get("/:id/tasks/:taskId", taskController.getById);
app.put("/:id/tasks/:taskId/done", taskController.markAsDone);
app.post("/:id/tasks/create", taskController.post);

export default app;
