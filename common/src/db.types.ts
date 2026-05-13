import { client, project, task } from "../../backend/src/db/schema";

export type Client = typeof client.$inferSelect;
export type Project = typeof project.$inferSelect & { client: Client };
export type Task = typeof task.$inferSelect;
