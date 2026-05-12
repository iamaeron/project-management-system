import { db } from "@/db";
import type { Context } from "hono";
import { clientSchema } from "@shared/index";

export const clientController = {
  get: async (c: Context) => {
    const clients = await db.query.client.findMany({
      limit: 20,
      with: {
        user: true,
      },
    });

    return c.json({
      clients,
      success: true,
      message: "Clients found!",
    });
  },
  post: async (c: Context) => {
    const formData = await c.req.formData();
    const f = clientSchema.parse(formData);

    // const name = formData.get("name") as string;
    // const grade = formData.get("email") as string;
  },
};
