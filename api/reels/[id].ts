import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage-serverless';


export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: 'Invalid reel ID' });
        }

        const reelId = parseInt(id, 10);

        if (isNaN(reelId)) {
            return res.status(400).json({ message: 'Reel ID must be a number' });
        }

        const reel = await storage.getReel(reelId);

        if (!reel) {
            return res.status(404).json({ message: 'Reel not found' });
        }

        return res.status(200).json(reel);
    } catch (error) {
        console.error('Error in /api/reels/[id]:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
