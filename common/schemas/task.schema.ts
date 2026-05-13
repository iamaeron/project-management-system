import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(5, { error: "Title is too short." }),
  description: z.string(),
});

export type TaskSchemaData = z.infer<typeof taskSchema>;
