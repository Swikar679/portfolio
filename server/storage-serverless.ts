import { getDb } from "./db-serverless.js";
import { reels, type Reel, type InsertReel } from "../shared/schema.js";
import { eq } from "drizzle-orm";

export interface IStorage {
    getReels(): Promise<Reel[]>;
    getReel(id: number): Promise<Reel | undefined>;
    createReel(reel: InsertReel): Promise<Reel>;
}

export class MemStorage implements IStorage {
    private reels: Map<number, Reel>;
    private currentId: number;

    constructor() {
        this.reels = new Map();
        this.currentId = 1;
    }

    async getReels(): Promise<Reel[]> {
        return Array.from(this.reels.values());
    }

    async getReel(id: number): Promise<Reel | undefined> {
        return this.reels.get(id);
    }

    async createReel(insertReel: InsertReel): Promise<Reel> {
        const id = this.currentId++;
        const reel: Reel = { isFeatured: false, ...insertReel, id };
        this.reels.set(id, reel);
        return reel;
    }
}

export class DatabaseStorage implements IStorage {
    async getReels(): Promise<Reel[]> {
        const db = getDb();
        if (!db) {
            throw new Error("Database not configured");
        }
        return await db.select().from(reels);
    }

    async getReel(id: number): Promise<Reel | undefined> {
        const db = getDb();
        if (!db) {
            throw new Error("Database not configured");
        }
        const [reel] = await db.select().from(reels).where(eq(reels.id, id));
        return reel;
    }

    async createReel(insertReel: InsertReel): Promise<Reel> {
        const db = getDb();
        if (!db) {
            throw new Error("Database not configured");
        }
        const [reel] = await db.insert(reels).values(insertReel).returning();
        return reel;
    }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
