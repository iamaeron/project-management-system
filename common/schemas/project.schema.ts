import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(5, { error: "Title is too short." }),
  description: z.string(),
  clientId: z.string().nullable(),
});

export type ProjectSchemaData = z.infer<typeof projectSchema>;
