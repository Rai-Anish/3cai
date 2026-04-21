import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schemas"

const connectionString = process.env.DATABASE_URL!;

//  Disable prefetch for Supabase Transaction mode (port 6543)
const client = postgres(connectionString, { prepare: false });

// Export the db instance for use in your app
export const db = drizzle(client, { schema: schema });