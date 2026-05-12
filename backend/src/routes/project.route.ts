import { projectController } from "@/controllers/project.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/projects");

app.get("/", projectController.get);
app.get("/:id", projectController.getById);
app.post("/create", projectController.post);

export default app;
