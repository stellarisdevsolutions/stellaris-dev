import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

export const isDatabaseConfigured = Boolean(
  process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.ALMACENAMIENTO_URL
);

// Drizzle instance configured with Vercel Postgres
export const db = isDatabaseConfigured ? drizzle(sql, { schema }) : null;

export * from "./schema";
