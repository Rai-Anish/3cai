import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schemas"

const connectionString = process.env.DATABASE_URL!;

declare global {
  var postgresClient: postgres.Sql | undefined;
}

// Disable prefetch for Supabase Transaction mode (port 6543)
const client = globalThis.postgresClient || postgres(connectionString, { prepare: false });

if (process.env.NODE_ENV !== 'production') {
  globalThis.postgresClient = client;
}

// Export the db instance for use in your app
export const db = drizzle(client, { schema: schema });