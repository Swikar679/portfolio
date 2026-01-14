import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage-serverless.js';


export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            // GET /api/reels - List all reels
            const reels = await storage.getReels();
            return res.status(200).json(reels);
        }

        if (req.method === 'POST') {
            // POST /api/reels - Create a new reel
            const { title, description, videoUrl, posterUrl, isFeatured } = req.body;

            if (!title || !videoUrl) {
                return res.status(400).json({
                    message: 'Title and videoUrl are required'
                });
            }

            const reel = await storage.createReel({
                title,
                description: description || '',
                videoUrl,
                posterUrl: posterUrl || `https://placehold.co/1080x1920/1a1a1a/ffffff?text=${title.replace(/ /g, '+')}`,
                isFeatured: isFeatured || false,
            });

            return res.status(201).json(reel);
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Error in /api/reels:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
