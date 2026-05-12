import { db } from "@/db";
import type { Context } from "hono";
import { clientSchema } from "@shared/index";
import { client } from "@/db/schema";
import { nanoid } from "nanoid";
import type { User } from "better-auth";

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
    const user: User = c.get("user");
    const formData = await c.req.json();
    const parsedData = clientSchema.parse(formData);

    const createdClient = await db
      .insert(client)
      .values({
        id: nanoid(),
        creatorId: user.id,
        email: parsedData.email,
        name: parsedData.name,
      })
      .returning();

    return c.json({
      createdClient,
      success: true,
      message: "Added a new client successfully!",
    });
  },
};
