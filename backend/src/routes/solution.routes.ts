import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { UserSolution } from '../models/UserSolution';

const router = Router();

// Get all language drafts for a specific problem
router.get('/:problemId', requireAuth, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { problemId } = req.params;
        const userId = req.firebaseUid;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const solutions = await UserSolution.find({ userId, problemId });
        
        // Convert to record of { [lang]: code }
        const drafts: Record<string, string> = {};
        for (const sol of solutions) {
            drafts[sol.language] = sol.code;
        }

        return res.json({ success: true, drafts });
    } catch (err: any) {
        console.error('Error fetching solutions:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
});

// Save or update draft code for a problem and language
router.post('/:problemId', requireAuth, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { problemId } = req.params;
        const { language, code } = req.body;
        const userId = req.firebaseUid;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        if (!language || typeof code !== 'string') {
            return res.status(400).json({ success: false, message: 'Language and code are required' });
        }

        const solution = await UserSolution.findOneAndUpdate(
            { userId, problemId, language },
            { code, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        return res.json({ success: true, solution });
    } catch (err: any) {
        console.error('Error saving solution:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
