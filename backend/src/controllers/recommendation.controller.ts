import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { UserLearningProfile } from '../models/UserLearningProfile';
import { ProblemRegistryService } from '../services/problemRegistry.service';

const categoryToTopics = (category: string): string[] => {
    const clean = category.toLowerCase().trim();
    if (clean.includes('arrays & hashing') || clean.includes('arrays and hashing')) return ['Arrays', 'Hashing'];
    if (clean.includes('array')) return ['Arrays'];
    if (clean.includes('hashing') || clean.includes('hash')) return ['Hashing'];
    if (clean.includes('two pointer') || clean.includes('two-pointer')) return ['Two Pointer'];
    if (clean.includes('sliding window') || clean.includes('sliding-window')) return ['Sliding Window'];
    if (clean.includes('binary search')) return ['Binary Search'];
    if (clean.includes('linked list') || clean.includes('linked-list')) return ['Linked List'];
    if (clean.includes('stack')) return ['Stack'];
    if (clean.includes('queue')) return ['Queue'];
    if (clean.includes('tree')) return ['Tree'];
    if (clean.includes('graph')) return ['Graph'];
    if (clean.includes('heap') || clean.includes('priority queue')) return ['Heap'];
    if (clean.includes('trie')) return ['Trie'];
    if (clean.includes('backtracking')) return ['Backtracking'];
    if (clean.includes('greedy')) return ['Greedy'];
    if (clean.includes('dynamic programming') || clean.includes('dp')) return ['DP'];
    if (clean.includes('string')) return ['Strings'];
    return [];
};

export class RecommendationController {
    public static async getRecommendations(req: AuthRequest, res: Response): Promise<void> {
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

            const profile = await UserLearningProfile.findOne({ userId: firebaseUid });
            if (!profile) {
                res.status(404).json({ message: 'Learning profile not found' });
                return;
            }

            const progressMapObj = Object.fromEntries(user.progress || new Map());
            const allProblems = ProblemRegistryService.getAllProblems();
            const isSolved = (id: string) => progressMapObj[id] === true;

            let recommendedProblemId = '';
            let reason = '';

            // Priority 1: Unsolved problem in the topic with the lowest mastery score
            const activeTopics = profile.topicProgress
                .filter(tp => (tp.attempted.length > 0 || tp.solved.length > 0) && tp.masteryScore < 70)
                .sort((a, b) => a.masteryScore - b.masteryScore);

            for (const topicProgress of activeTopics) {
                const topicProbs = allProblems.filter(p => {
                    const topics = categoryToTopics(p.category);
                    return topics.includes(topicProgress.topic) && !isSolved(p.id);
                });

                if (topicProbs.length > 0) {
                    const idx = Math.floor(Math.random() * topicProbs.length);
                    recommendedProblemId = topicProbs[idx].id;
                    reason = `Boost your mastery in ${topicProgress.topic} (currently at ${topicProgress.masteryScore}%).`;
                    break;
                }
            }

            // Priority 2: Unsolved problem in any weak topic (mastery < 40%)
            if (!recommendedProblemId && profile.weakTopics && profile.weakTopics.length > 0) {
                for (const topic of profile.weakTopics) {
                    const topicProbs = allProblems.filter(p => {
                        const topics = categoryToTopics(p.category);
                        return topics.includes(topic) && !isSolved(p.id);
                    });

                    if (topicProbs.length > 0) {
                        const idx = Math.floor(Math.random() * topicProbs.length);
                        recommendedProblemId = topicProbs[idx].id;
                        reason = `You need to practice ${topic} to raise your Topic Mastery.`;
                        break;
                    }
                }
            }

            // Priority 3: Overdue Revision problems
            if (!recommendedProblemId && profile.revisionQueue && profile.revisionQueue.length > 0) {
                const now = new Date();
                const overdueRevisions = profile.revisionQueue.filter(r => new Date(r.nextRevisionDue).getTime() <= now.getTime());
                if (overdueRevisions.length > 0) {
                    overdueRevisions.sort((a, b) => new Date(a.nextRevisionDue).getTime() - new Date(b.nextRevisionDue).getTime());
                    recommendedProblemId = overdueRevisions[0].problemId;
                    reason = `Lock this problem in your long-term memory via space-repetition review.`;
                }
            }

            // Priority 4: Random unsolved problem
            if (!recommendedProblemId) {
                const unsolved = allProblems.filter(p => !isSolved(p.id));
                if (unsolved.length > 0) {
                    const idx = Math.floor(Math.random() * unsolved.length);
                    recommendedProblemId = unsolved[idx].id;
                    reason = `Maintain your coding momentum with a new unsolved topic challenge.`;
                }
            }

            // Fallback: Random solved problem
            if (!recommendedProblemId && allProblems.length > 0) {
                const idx = Math.floor(Math.random() * allProblems.length);
                recommendedProblemId = allProblems[idx].id;
                reason = `Keep your daily coding streak alive by reviewing this problem.`;
            }

            if (!recommendedProblemId) {
                res.status(404).json({ message: 'No recommendations found' });
                return;
            }

            const problemInfo = ProblemRegistryService.getProblem(recommendedProblemId);
            res.json({
                problemId: recommendedProblemId,
                title: problemInfo ? problemInfo.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : recommendedProblemId,
                category: problemInfo ? problemInfo.category : 'Unknown',
                difficulty: problemInfo ? problemInfo.difficulty : 'Medium',
                reason
            });
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
