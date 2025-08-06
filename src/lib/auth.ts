import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Pool } from "pg";

import { db } from "@/db";

export const auth = betterAuth({
  //   database: new Pool({
  //     // connection options
  //   }),
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
});
