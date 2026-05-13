import { db } from "@/db";
import { project } from "@/db/schema";
import { projectSchema } from "@shared/index";
import type { User } from "better-auth";
import type { Context } from "hono";
import { nanoid } from "nanoid";

export const projectController = {
  get: async (c: Context) => {
    const projects = await db.query.project.findMany({
      limit: 20,
      with: {
        user: true,
        client: true,
        tasks: true,
      },
    });

    const projectWithCounts = projects.map((project) => {
      let completed = 0;
      let pending = 0;

      project.tasks.map((task) => {
        if (task.isCompleted) {
          completed++;
        } else {
          pending++;
        }
      });

      return {
        ...project,
        completedCount: completed,
        pendingCount: pending,
      };
    });

    return c.json({
      projects: projectWithCounts,
      success: true,
      message: "Projects found!",
    });
  },
  post: async (c: Context) => {
    const user: User = c.get("user");
    const formData = await c.req.json();
    const parsedData = projectSchema.parse(formData);

    const createdClient = await db
      .insert(project)
      .values({
        id: nanoid(),
        title: parsedData.title,
        description: parsedData.description,
        clientId: parsedData.clientId,
        creatorId: user.id,
      })
      .returning();

    return c.json({
      createdClient,
      success: true,
      message: "Added a new project successfully!",
    });
  },
  getById: async (c: Context) => {
    const projectId = c.req.param("id");

    if (!projectId) {
      return c.json({
        success: false,
        message: "Project ID not found.",
      });
    }

    const foundProject = await db.query.project.findFirst({
      where: (project, { eq }) => eq(project.id, projectId),
      with: {
        tasks: true,
        client: true,
      },
    });

    if (!foundProject) {
      return c.json({
        success: false,
        message: "Project was not found.",
      });
    }

    return c.json({
      project: foundProject,
      success: true,
      message: "Project found!",
    });
  },
};
