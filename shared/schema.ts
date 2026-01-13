import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reels = pgTable("reels", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  videoUrl: text("video_url").notNull(),
  posterUrl: text("poster_url").notNull(),
  isFeatured: boolean("is_featured").default(false),
});

export const insertReelSchema = createInsertSchema(reels).omit({ id: true });

export type Reel = typeof reels.$inferSelect;
export type InsertReel = z.infer<typeof insertReelSchema>;
