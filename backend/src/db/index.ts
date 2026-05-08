import "dotenv/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "./schema";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
