import { db } from "@/db";
import { project, task } from "@/db/schema";
import { projectSchema, taskSchema } from "@shared/index";
import type { User } from "better-auth";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { nanoid } from "nanoid";

export const taskController = {
  get: async (c: Context) => {
    const projectId = c.req.param("id");

    if (!projectId) {
      return c.json({
        success: false,
        message: "Project ID not found.",
      });
    }

    const foundTasks = await db.query.task.findMany({
      where: (task, { eq }) => eq(task.projectId, projectId),
    });

    return c.json({
      tasks: foundTasks,
      success: true,
      message: "Project found!",
    });
  },
  post: async (c: Context) => {
    const user: User = c.get("user");
    const projectId = c.req.param("id");
    const formData = await c.req.json();
    const parsedData = taskSchema.parse(formData);

    if (!projectId) {
      return c.json({
        success: false,
        message: "Project ID not found.",
      });
    }

    const createdClient = await db
      .insert(task)
      .values({
        id: nanoid(),
        title: parsedData.title,
        description: parsedData.description,
        projectId: projectId,
        userId: user.id,
      })
      .returning();

    return c.json({
      createdClient,
      success: true,
      message: "Added a new project successfully!",
    });
  },
  getById: async (c: Context) => {
    const taskId = c.req.param("taskId");

    if (!taskId) {
      return c.json({
        success: false,
        message: "Project ID not found.",
      });
    }

    const foundTask = await db.query.task.findFirst({
      where: (task, { eq }) => eq(task.id, taskId),
    });

    if (!foundTask) {
      return c.json({
        success: false,
        message: "Task was not found.",
      });
    }

    return c.json({
      task: foundTask,
      success: true,
      message: "Project found!",
    });
  },
  toggleStatus: async (c: Context) => {
    const taskId = c.req.param("taskId");
    const value = await c.req.json();

    if (!taskId) {
      return c.json({
        success: false,
        message: "Task ID not found.",
      });
    }

    const updatedTask = await db
      .update(task)
      .set({
        isCompleted: value.status,
      })
      .where(eq(task.id, taskId));

    return c.json({
      task: updatedTask,
      success: true,
      message: "Task status updated!",
    });
  },
};
