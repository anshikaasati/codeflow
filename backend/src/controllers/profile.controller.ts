import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

export class ProfileController {
    // Get profile details
    public static async getProfile(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            const user = await User.findOne({ firebaseUid });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json({
                user: {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    selectedLanguage: user.selectedLanguage || 'cpp',
                    bio: user.bio || '',
                    githubUrl: user.githubUrl || '',
                    linkedinUrl: user.linkedinUrl || '',
                    portfolioUrl: user.portfolioUrl || '',
                    gender: user.gender || '',
                    location: user.location || '',
                    birthday: user.birthday || '',
                    xUrl: user.xUrl || '',
                    work: user.work || '',
                    education: user.education || '',
                    skills: user.skills || '',
                    streak: user.streak || 0,
                    lastActiveDate: user.lastActiveDate,
                    activityLogs: user.activityLogs || []
                }
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    public static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            const { 
                displayName, bio, githubUrl, linkedinUrl, portfolioUrl, photoURL, selectedLanguage,
                gender, location, birthday, xUrl, work, education, skills
            } = req.body;

            const user = await User.findOne({ firebaseUid });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            if (displayName !== undefined) user.displayName = displayName;
            if (bio !== undefined) user.bio = bio;
            if (githubUrl !== undefined) user.githubUrl = githubUrl;
            if (linkedinUrl !== undefined) user.linkedinUrl = linkedinUrl;
            if (portfolioUrl !== undefined) user.portfolioUrl = portfolioUrl;
            if (photoURL !== undefined) user.photoURL = photoURL;
            if (selectedLanguage !== undefined) user.selectedLanguage = selectedLanguage;
            if (gender !== undefined) user.gender = gender;
            if (location !== undefined) user.location = location;
            if (birthday !== undefined) user.birthday = birthday;
            if (xUrl !== undefined) user.xUrl = xUrl;
            if (work !== undefined) user.work = work;
            if (education !== undefined) user.education = education;
            if (skills !== undefined) user.skills = skills;

            // Log recent activity for updating profile settings
            user.activityLogs.unshift({
                title: 'Updated profile settings',
                type: 'profile_update',
                createdAt: new Date()
            });

            // Limit activity logs to top 20 items to prevent unbounded array growth
            if (user.activityLogs.length > 20) {
                user.activityLogs = user.activityLogs.slice(0, 20);
            }

            await user.save();

            res.json({ message: 'Profile updated successfully', user });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Avatar upload (supporting both direct file, base64 data, or public URLs)
    public static async updateAvatar(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { avatarUrl } = req.body;

            if (!avatarUrl) {
                res.status(400).json({ message: 'Missing avatar URL' });
                return;
            }

            const firebaseUid = req.firebaseUid;
            const user = await User.findOne({ firebaseUid });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // Save avatar url to database
            user.photoURL = avatarUrl;
            
            user.activityLogs.unshift({
                title: 'Updated profile avatar',
                type: 'avatar_update',
                createdAt: new Date()
            });
            if (user.activityLogs.length > 20) {
                user.activityLogs = user.activityLogs.slice(0, 20);
            }

            await user.save();

            res.json({
                message: 'Avatar updated successfully',
                photoURL: avatarUrl
            });
        } catch (error) {
            console.error('Error updating avatar:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Get public profile details (unauthenticated)
    public static async getPublicProfile(req: any, res: Response): Promise<void> {
        try {
            const username = req.params.username;
            if (!username) {
                res.status(400).json({ message: 'Username is required' });
                return;
            }

            // Case-insensitive exact match first, then match with space-stripping
            let user = await User.findOne({ displayName: new RegExp(`^${username}$`, 'i') });
            if (!user) {
                const allUsers = await User.find({});
                user = allUsers.find(u => u.displayName.toLowerCase().replace(/\s+/g, '') === username.toLowerCase()) || null;
            }

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const progressMapObj = Object.fromEntries(user.progress || new Map());
            const solvedCount = Object.values(progressMapObj).filter(v => v === true).length;
            
            const { UserLearningProfile } = require('../models/UserLearningProfile');
            const profile = await UserLearningProfile.findOne({ userId: user.firebaseUid });

            // Calculate readiness score elements
            const completionRate = Math.min(100, (solvedCount / 200) * 100);
            const totalMastery = profile ? profile.topicProgress.reduce((sum: number, tp: any) => sum + (tp.masteryScore || 0), 0) : 0;
            const avgMastery = profile && profile.topicProgress.length > 0 ? (totalMastery / profile.topicProgress.length) : 0;
            const overdueCount = profile ? profile.revisionQueue.filter((r: any) => new Date(r.nextRevisionDue).getTime() < Date.now()).length : 0;
            const revisionAdherence = profile && profile.revisionQueue.length > 0
                ? Math.min(100, ((profile.revisionQueue.length - overdueCount) / profile.revisionQueue.length) * 100)
                : 100;
            const streakBonus = Math.min(100, ((user.streak || 0) / 30) * 100);
            
            const readinessScore = Math.round(
                (0.35 * completionRate) + 
                (0.35 * avgMastery) + 
                (0.20 * revisionAdherence) + 
                (0.10 * streakBonus)
            );

            // Compute achievements
            const achievements: any[] = [];
            if (user.streak >= 7) {
                achievements.push({ id: 'streak_7', name: 'Streak Warrior', description: 'Maintained a 7-day coding streak', icon: 'zap' });
            }
            if (user.streak >= 30) {
                achievements.push({ id: 'streak_30', name: 'Streak Legend', description: 'Maintained a 30-day coding streak', icon: 'zap-legend' });
            }
            if (profile) {
                const graph = profile.topicProgress.find((x: any) => x.topic === 'Graph');
                if (graph && graph.masteryScore >= 75) {
                    achievements.push({ id: 'master_graph', name: 'Graph Master', description: 'Achieved >= 75% mastery in Graphs', icon: 'git-branch' });
                }
                const dp = profile.topicProgress.find((x: any) => x.topic === 'DP');
                if (dp && dp.masteryScore >= 75) {
                    achievements.push({ id: 'master_dp', name: 'DP Master', description: 'Achieved >= 75% mastery in Dynamic Programming', icon: 'cpu' });
                }
                const bs = profile.topicProgress.find((x: any) => x.topic === 'Binary Search');
                if (bs && bs.masteryScore >= 75) {
                    achievements.push({ id: 'master_bs', name: 'Binary Searcher', description: 'Achieved >= 75% mastery in Binary Search', icon: 'search' });
                }
                if (profile.totalTraced >= 20) {
                    achievements.push({ id: 'trace_expert', name: 'Visualizer Expert', description: 'Traced 20+ execution graphs', icon: 'eye' });
                }
            }
            if (solvedCount >= 100) {
                achievements.push({ id: 'champ_100', name: 'CodeFlow Champion', description: 'Solved 100+ DSA problems', icon: 'award' });
            }

            res.json({
                user: {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    bio: user.bio || '',
                    githubUrl: user.githubUrl || '',
                    linkedinUrl: user.linkedinUrl || '',
                    portfolioUrl: user.portfolioUrl || '',
                    streak: user.streak || 0,
                    readinessScore,
                    solvedCount,
                    totalTraced: profile ? profile.totalTraced : 0,
                    achievements,
                    topicProgress: profile ? profile.topicProgress.map((tp: any) => ({
                        topic: tp.topic,
                        masteryScore: tp.masteryScore,
                        solvedCount: tp.solved.length
                    })) : []
                }
            });
        } catch (error) {
            console.error('Error fetching public profile:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
