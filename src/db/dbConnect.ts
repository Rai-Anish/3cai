import { Pool } from "pg";

// Tell TypeScript about the global property
const globalForPg = global as unknown as { pool: Pool };

// Reuse the existing pool if it exists, otherwise create a new one
export const pool =
  globalForPg.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

// In development, save the pool to the global object
if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}