import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { AiService } from '../services/ai.service';

const router = Router();
const aiService = new AiService();

router.post('/tutor', requireAuth, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { code, language, traceSteps = [], currentStepIndex = null, chatHistory = [], message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        if (typeof code !== 'string') {
            return res.status(400).json({ success: false, message: 'Code must be a string' });
        }

        const tutorResponse = await aiService.askTutor(
            code,
            language || 'cpp',
            traceSteps,
            currentStepIndex,
            chatHistory,
            message
        );

        return res.json({ success: true, response: tutorResponse });
    } catch (err: any) {
        console.error('Error in AI Tutor endpoint:', err);
        return res.status(500).json({ success: false, message: err.message || 'Internal AI Tutor error' });
    }
});

export default router;
