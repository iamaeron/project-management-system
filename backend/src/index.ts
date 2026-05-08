import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";

// routes
import clientRoutes from "@/routes/client.route";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.route("/api", clientRoutes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
