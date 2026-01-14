import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage-serverless';


// Seed data for the database
const seedReels = [
    {
        title: "Ambiance Edit",
        description: "Edit for a Premium Restaurant.",
        filename: "alcove video.mp4",
        isFeatured: true,
    },
    {
        title: "Event Edit",
        description: "Edit for Ncell Event.",
        filename: "reel2.mp4",
        isFeatured: false,
    },
    {
        title: "College Event Edit",
        description: "One of my college event edit.",
        filename: "reel3.mp4",
        isFeatured: false,
    },
    {
        title: "Social Media Edit",
        description: "Edit for a short form reel.",
        filename: "reel4.mp4",
        isFeatured: false,
    },
    {
        title: "Educational Content Edit",
        description: "Short & High Retention rate focused edit",
        filename: "reel5.mp4",
        isFeatured: false,
    },
];

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Check if database already has reels
        const existingReels = await storage.getReels();

        if (existingReels.length > 0) {
            return res.status(200).json({
                message: 'Database already seeded',
                count: existingReels.length
            });
        }

        // Seed the database
        for (const reelData of seedReels) {
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

        const newReels = await storage.getReels();

        return res.status(200).json({
            message: 'Database seeded successfully',
            count: newReels.length,
            reels: newReels
        });
    } catch (error) {
        console.error('Error in /api/admin/seed:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
