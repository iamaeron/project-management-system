import { clientController } from "@/controllers/client.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/clients");

app.get("/", clientController.get);

export default app;
