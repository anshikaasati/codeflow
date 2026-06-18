import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

export class UserPreferenceController {
    // Get preferred language
    public static async getPreferences(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            const user = await User.findOne({ firebaseUid });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json({
                preferredLanguage: user.preferredLanguage || 'cpp'
            });
        } catch (error) {
            console.error('Error fetching user preferences:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Update preferred language
    public static async updatePreferences(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            const { preferredLanguage } = req.body;

            if (!preferredLanguage || !['cpp', 'python'].includes(preferredLanguage)) {
                res.status(400).json({ message: 'Invalid preferred language. Only "cpp" or "python" are supported.' });
                return;
            }

            const user = await User.findOne({ firebaseUid });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            user.preferredLanguage = preferredLanguage as 'cpp' | 'python';
            await user.save();

            res.json({
                message: 'Preferences updated successfully',
                preferredLanguage: user.preferredLanguage
            });
        } catch (error) {
            console.error('Error updating user preferences:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
