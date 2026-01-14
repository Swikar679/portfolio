import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../shared/schema.js";

// Global connection pool for serverless functions
// This helps reuse connections across function invocations
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
    if (!process.env.DATABASE_URL) {
        console.warn("DATABASE_URL not set. Using in-memory storage.");
        return null;
    }

    // Reuse existing connection if available
    if (db) {
        return db;
    }

    // Create new connection pool
    try {
        const url = new URL(process.env.DATABASE_URL);
        console.log(`[db] Connecting to host: ${url.hostname}`);
    } catch (e) {
        console.error(`[db] Invalid DATABASE_URL format`);
    }

    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        // Serverless-friendly settings
        max: 1, // Limit connections in serverless
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    });

    db = drizzle(pool, { schema });
    return db;
}

export function getPool() {
    return pool;
}
