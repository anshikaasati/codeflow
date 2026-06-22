import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { User } from '../models/User';
import { DailyProgress } from '../models/DailyProgress';

export const checkSubscriptionLimits = (limitType: 'ai' | 'trace') => {
    return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const firebaseUid = req.firebaseUid;
            if (!firebaseUid) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const user = await User.findOne({ firebaseUid });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const plan = user.subscriptionPlan || 'free';
            const todayStr = new Date().toISOString().split('T')[0];

            let progressToday = await DailyProgress.findOne({ userId: firebaseUid, date: todayStr });
            if (!progressToday) {
                progressToday = new DailyProgress({
                    userId: firebaseUid,
                    date: todayStr,
                    solvedCount: 0,
                    tracesCount: 0,
                    revisionsCount: 0,
                    aiRequestsCount: 0
                });
                await progressToday.save();
            }

            if (limitType === 'ai') {
                const limit = plan === 'free' ? 5 : plan === 'pro' ? 50 : 9999;
                if (progressToday.aiRequestsCount >= limit) {
                    res.status(403).json({
                        message: `Daily AI Tutor quota exceeded. Upgrade your plan to get more requests.`,
                        quotaExceeded: true,
                        limitType: 'ai',
                        plan
                    });
                    return;
                }
                
                // Increment count
                progressToday.aiRequestsCount += 1;
                await progressToday.save();
            } else if (limitType === 'trace') {
                const limit = plan === 'free' ? 10 : plan === 'pro' ? 100 : 9999;
                if (progressToday.tracesCount >= limit) {
                    res.status(403).json({
                        message: `Daily Trace Visualization quota exceeded. Upgrade your plan to get more requests.`,
                        quotaExceeded: true,
                        limitType: 'trace',
                        plan
                    });
                    return;
                }
            }

            next();
        } catch (error) {
            console.error('Error checking subscription limits:', error);
            res.status(500).json({ message: 'Internal server error checking quota' });
        }
    };
};
