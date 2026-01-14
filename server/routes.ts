import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer storage
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storageConfig });

async function seedDatabase() {
  const existingReels = await storage.getReels();
  if (existingReels.length === 0) {
    console.log("Seeding database with reels...");

    // --- HOW TO ADD YOUR REELS ---
    // 1. Put your video files in: client/public/reels/
    // 2. Add a new item to this list below:
    const myReelsList = [
      {
        title: "Ambiance Edit",
        description: "Edit for a Premeium Restaurant.",
        filename: "alcove video.mp4", // Must match file in client/public/reels/
        isFeatured: true,
      },
      {
        title: "Event Edit",
        description: "Edit  for Ncell Event. ",
        filename: "reel2.mp4", // Matched actual file
        isFeatured: false,
      },
      {
        title: "College Event Edit",
        description: "On of my college event edit.",
        filename: "reel3.mp4", // Matched actual file
        isFeatured: false,
      },
      {
        title: "Social Media Edit",
        description: "Edit for a short form reel.",
        filename: "reel4.mp4", // Matched actual file
        isFeatured: false,
      },
      {
        title: "Educational Content Edit",
        description: " Short & High Retention rate focused edit ",
        filename: "reel5.mp4", // Matched actual file
        isFeatured: false,
      },
    ];

    for (const reelData of myReelsList) {
      // Check if it's a placeholder or real file
      const isPlaceholder = reelData.filename === "placeholder-video.mp4";
      const videoUrl = isPlaceholder
        ? "https://www.w3schools.com/html/mov_bbb.mp4"
        : `/reels/${reelData.filename}`;

      const posterText = reelData.title.replace(/ /g, "+");

      await storage.createReel({
        title: reelData.title,
        description: reelData.description,
        videoUrl: videoUrl,
        posterUrl: `https://placehold.co/1080x1920/1a1a1a/ffffff?text=${posterText}`,
        isFeatured: reelData.isFeatured,
      });
    }
    console.log("Database seeded successfully.");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database on startup
  seedDatabase().catch(console.error);

  // Manual seed endpoint for the user to easily reset/update data if they edit the code
  app.post("/api/admin/seed", async (req, res) => {
    await seedDatabase();
    res.json({ message: "Seeding triggered" });
  });

  app.get(api.reels.list.path, async (req, res) => {
    const reels = await storage.getReels();
    res.json(reels);
  });

  app.get(api.reels.get.path, async (req, res) => {
    const reel = await storage.getReel(Number(req.params.id));
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }
    res.json(reel);
  });

  app.post("/api/reels", upload.fields([{ name: 'video' }, { name: 'poster' }]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const videoFile = files['video']?.[0];
      const posterFile = files['poster']?.[0];

      if (!videoFile) {
        return res.status(400).json({ message: "Video file is required" });
      }

      const reel = await storage.createReel({
        title: req.body.title || "Untitled Reel",
        description: req.body.description || "",
        videoUrl: `/uploads/${videoFile.filename}`,
        posterUrl: posterFile ? `/uploads/${posterFile.filename}` : "https://placehold.co/1080x1920/1a1a1a/ffffff?text=No+Cover",
        isFeatured: req.body.isFeatured === 'true',
      });
      res.status(201).json(reel);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Add seed route for production setup
  app.get("/api/admin/seed", async (_req, res) => {
    try {
      const existing = await storage.getReels();
      if (existing.length > 0) {
        return res.json({ message: "Already seeded", count: existing.length });
      }

      const seedReels = [
        { title: "Ambiance Edit", description: "Edit for a Premium Restaurant.", videoUrl: "/reels/alcove video.mp4", posterUrl: "https://placehold.co/1080x1920?text=Ambiance", isFeatured: true },
        { title: "Event Edit", description: "Edit for Ncell Event.", videoUrl: "/reels/reel2.mp4", posterUrl: "https://placehold.co/1080x1920?text=Event", isFeatured: false },
        { title: "College Edit", description: "One of my college event edit.", videoUrl: "/reels/reel3.mp4", posterUrl: "https://placehold.co/1080x1920?text=College", isFeatured: false },
        { title: "Social Media", description: "Edit for a short form reel.", videoUrl: "/reels/reel4.mp4", posterUrl: "https://placehold.co/1080x1920?text=Social", isFeatured: false },
        { title: "Educational", description: "Short & High Retention rate focused edit", videoUrl: "/reels/reel5.mp4", posterUrl: "https://placehold.co/1080x1920?text=Educational", isFeatured: false },
      ];

      for (const r of seedReels) {
        await storage.createReel(r);
      }

      res.json({ message: "Database seeded successfully", count: seedReels.length });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
  });

  return httpServer;
}
