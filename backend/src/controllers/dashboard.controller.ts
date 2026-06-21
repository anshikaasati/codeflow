import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { Visualization } from '../models/Visualization';
import { UserSolution } from '../models/UserSolution';
import { UserLearningProfile } from '../models/UserLearningProfile';
import { ProblemRegistryService } from '../services/problemRegistry.service';
import { TraceEvent } from '../models/TraceEvent';

const DEFAULT_TOPICS = [
    'Arrays', 'Hashing', 'Strings', 'Two Pointer', 'Sliding Window', 'Binary Search', 
    'Linked List', 'Stack', 'Queue', 'Tree', 'Graph', 'Heap', 'Trie', 'Backtracking', 
    'Greedy', 'DP'
];

const DEFAULT_PATTERNS = [
    'Two Pointer', 'DFS', 'BFS', 'Topological Sort', 'Union Find', 'Recursion', 
    'Memoization', 'Backtracking', 'Monotonic Stack', 'Heap'
];

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

const getOrCreateProfile = async (userId: string) => {
    let profile = await UserLearningProfile.findOne({ userId });
    if (!profile) {
        profile = new UserLearningProfile({
            userId,
            totalSolved: 0,
            totalTraced: 0,
            totalVisualizations: 0,
            totalLearningTime: 0,
            preferredLearningStyle: 'visual',
            strongTopics: [],
            weakTopics: [],
            topicProgress: DEFAULT_TOPICS.map(topic => ({
                topic,
                solved: [],
                attempted: [],
                accuracy: 100,
                averageTime: 0,
                masteryScore: 0
            })),
            patternProgress: DEFAULT_PATTERNS.map(pattern => ({
                pattern,
                solved: [],
                attempted: [],
                masteryScore: 0
            })),
            revisionQueue: []
        });
        await profile.save();
    }
    return profile;
};

export class DashboardController {
    // Get learning profile
    public static async getLearningProfile(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            if (!firebaseUid) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const profile = await getOrCreateProfile(firebaseUid);
            res.json(profile);
        } catch (error) {
            console.error('Error fetching learning profile:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Record learning heartbeat (increments learning time)
    public static async recordHeartbeat(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            if (!firebaseUid) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const profile = await getOrCreateProfile(firebaseUid);
            
            // Add 30 seconds of learning time (0.5 minutes)
            profile.totalLearningTime += 0.5;
            await profile.save();
            
            res.json({ success: true, totalLearningTime: profile.totalLearningTime });
        } catch (error) {
            console.error('Error updating heartbeat:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Record trace usage stats
    public static async recordTraceUsage(userId: string, problemId?: string): Promise<void> {
        try {
            const profile = await getOrCreateProfile(userId);
            profile.totalTraced += 1;
            
            if (problemId) {
                const prob = ProblemRegistryService.getProblem(problemId);
                if (prob) {
                    const topics = categoryToTopics(prob.category);
                    for (const t of topics) {
                        const tp = profile.topicProgress.find(x => x.topic === t);
                        if (tp && !tp.attempted.includes(problemId)) {
                            tp.attempted.push(problemId);
                        }
                    }
                    for (const pat of prob.patterns) {
                        const pp = profile.patternProgress.find(x => x.pattern === pat);
                        if (pp && !pp.attempted.includes(problemId)) {
                            pp.attempted.push(problemId);
                        }
                    }
                }
            }
            await profile.save();
        } catch (e) {
            console.error('Error recording trace usage:', e);
        }
    }

    // Synchronize user progress map with learning profile
    public static async syncProfileSolvedProblems(userId: string, progress: Record<string, boolean>): Promise<void> {
        try {
            const profile = await getOrCreateProfile(userId);
            
            // Get all problems from registry to build topic maps
            const allProblems = ProblemRegistryService.getAllProblems();
            const topicTotalMap: Record<string, number> = {};
            const patternTotalMap: Record<string, number> = {};

            // Calculate total problems count per topic and pattern
            for (const p of allProblems) {
                const topics = categoryToTopics(p.category);
                for (const t of topics) {
                    topicTotalMap[t] = (topicTotalMap[t] || 0) + 1;
                }
                for (const pat of p.patterns) {
                    patternTotalMap[pat] = (patternTotalMap[pat] || 0) + 1;
                }
            }

            // Group solved and attempted problems by topic and pattern
            const solvedTopicProblems: Record<string, Set<string>> = {};
            const attemptedTopicProblems: Record<string, Set<string>> = {};
            const solvedPatternProblems: Record<string, Set<string>> = {};
            const attemptedPatternProblems: Record<string, Set<string>> = {};

            for (const [probId, isSolved] of Object.entries(progress)) {
                const prob = ProblemRegistryService.getProblem(probId);
                if (!prob) continue;

                const topics = categoryToTopics(prob.category);
                for (const t of topics) {
                    if (!solvedTopicProblems[t]) solvedTopicProblems[t] = new Set();
                    if (!attemptedTopicProblems[t]) attemptedTopicProblems[t] = new Set();
                    
                    attemptedTopicProblems[t].add(probId);
                    if (isSolved) {
                        solvedTopicProblems[t].add(probId);
                    }
                }

                for (const pat of prob.patterns) {
                    if (!solvedPatternProblems[pat]) solvedPatternProblems[pat] = new Set();
                    if (!attemptedPatternProblems[pat]) attemptedPatternProblems[pat] = new Set();

                    attemptedPatternProblems[pat].add(probId);
                    if (isSolved) {
                        solvedPatternProblems[pat].add(probId);
                    }
                }
            }

            // Retrieve saved visualizations for trace bonus
            const visualizations = await Visualization.find({ userId });
            const visualizedProblems = new Set(
                visualizations
                    .map(v => v.metadata?.problemDetails?.id || v.metadata?.problemId)
                    .filter(Boolean)
            );

            let totalSolvedCount = 0;
            const uniqueSolved = new Set<string>();
            for (const [probId, isSolved] of Object.entries(progress)) {
                if (isSolved) uniqueSolved.add(probId);
            }
            totalSolvedCount = uniqueSolved.size;

            // Update Topic Progress subdocuments
            for (const tp of profile.topicProgress) {
                const solvedSet = solvedTopicProblems[tp.topic] || new Set();
                const attemptedSet = attemptedTopicProblems[tp.topic] || new Set();

                tp.solved = Array.from(solvedSet);
                tp.attempted = Array.from(attemptedSet);

                const totalInTopic = topicTotalMap[tp.topic] || 1;
                const completionRate = solvedSet.size / totalInTopic;

                // Trace bonus: 5% per visualized problem, capped at 20%
                const visualizedInTopic = tp.attempted.filter(id => visualizedProblems.has(id)).length;
                const traceBonus = Math.min(20, visualizedInTopic * 5);

                // Mastery calculation: 80% completion + 20% trace usage
                tp.masteryScore = Math.round(Math.min(100, (completionRate * 80) + traceBonus));
            }

            // Update Pattern Progress subdocuments
            for (const pp of profile.patternProgress) {
                const solvedSet = solvedPatternProblems[pp.pattern] || new Set();
                const attemptedSet = attemptedPatternProblems[pp.pattern] || new Set();

                pp.solved = Array.from(solvedSet);
                pp.attempted = Array.from(attemptedSet);

                const totalInPattern = patternTotalMap[pp.pattern] || 1;
                const completionRate = solvedSet.size / totalInPattern;

                pp.masteryScore = Math.round(completionRate * 100);
            }

            // Calculate Strong and Weak Topics
            profile.strongTopics = profile.topicProgress
                .filter(tp => tp.masteryScore >= 70)
                .map(tp => tp.topic);

            profile.weakTopics = profile.topicProgress
                .filter(tp => tp.masteryScore < 40 && (tp.attempted.length > 0 || tp.solved.length > 0))
                .map(tp => tp.topic);

            profile.totalSolved = totalSolvedCount;
            profile.totalVisualizations = visualizations.length;

            // Sync solved problems to revision queue
            if (!profile.revisionQueue) {
                profile.revisionQueue = [];
            }
            for (const probId of Array.from(uniqueSolved)) {
                const exists = profile.revisionQueue.some(r => r.problemId === probId);
                if (!exists) {
                    profile.revisionQueue.push({
                        problemId: probId,
                        lastSolved: new Date(),
                        nextRevisionDue: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Due in 1 day
                        intervalDays: 1,
                        revisionCount: 0
                    });
                }
            }
            
            await profile.save();
        } catch (e) {
            console.error('Error syncing profile solved problems:', e);
        }
    }

    public static async getDashboardStats(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            if (!firebaseUid) {
                res.status(401).json({ message: 'Unauthorized: Missing user credentials' });
                return;
            }
            const user = await User.findOne({ firebaseUid });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // Count saved visualizations
            const savedTracesCount = await Visualization.countDocuments({ userId: firebaseUid });

            // Count total solved problems
            let solvedCount = 0;
            const progressMapObj = Object.fromEntries(user.progress || new Map());
            solvedCount = Object.values(progressMapObj).filter(v => v === true).length;

            // Calculate solved counts per language
            const solvedPerLanguage: Record<string, number> = { cpp: 0, python: 0 };
            const solutions = await UserSolution.find({ userId: firebaseUid });
            const langSolvedSets: Record<string, Set<string>> = {};

            for (const sol of solutions) {
                if (progressMapObj[sol.problemId] === true) {
                    if (!langSolvedSets[sol.language]) {
                        langSolvedSets[sol.language] = new Set<string>();
                    }
                    langSolvedSets[sol.language].add(sol.problemId);
                }
            }

            for (const lang of Object.keys(langSolvedSets)) {
                solvedPerLanguage[lang] = langSolvedSets[lang].size;
            }

            // Auto-calculate daily streak
            const now = new Date();
            const lastActive = user.lastActiveDate;
            
            let shouldSaveUser = false;
            if (!lastActive) {
                user.streak = 1;
                user.lastActiveDate = now;
                shouldSaveUser = true;
            } else {
                const lastDate = new Date(lastActive);
                const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const compareDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
                
                const diffTime = todayDate.getTime() - compareDate.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    user.streak += 1;
                    user.lastActiveDate = now;
                    user.activityLogs.unshift({
                        title: `Kept up the streak! Day ${user.streak} 🚀`,
                        type: 'streak_keep',
                        createdAt: now
                    });
                    shouldSaveUser = true;
                } else if (diffDays > 1) {
                    user.streak = 1;
                    user.lastActiveDate = now;
                    user.activityLogs.unshift({
                        title: 'Started a new learning streak! 🚀',
                        type: 'streak_start',
                        createdAt: now
                    });
                    shouldSaveUser = true;
                }
            }

            if (shouldSaveUser) {
                if (user.activityLogs.length > 20) {
                    user.activityLogs = user.activityLogs.slice(0, 20);
                }
                await user.save();
            }

            // Aggregate category-wise counts dynamically
            const allProblems = ProblemRegistryService.getAllProblems();
            const categorySolved: Record<string, number> = {};
            const categoryTotal: Record<string, number> = {};

            for (const p of allProblems) {
                const cat = p.category.toLowerCase().replace(/ & /g, '').replace(/ /g, '');
                categoryTotal[cat] = (categoryTotal[cat] || 0) + 1;
                if (progressMapObj[p.id] === true) {
                    categorySolved[cat] = (categorySolved[cat] || 0) + 1;
                }
            }

            const learningStats = Object.keys(categoryTotal).map(catKey => {
                const solved = categorySolved[catKey] || 0;
                const total = categoryTotal[catKey] || 1;
                return {
                    id: catKey,
                    completed: Math.round((solved / total) * 100)
                };
            });

            // Calculate Readiness Score elements
            const profile = await getOrCreateProfile(firebaseUid);
            
            // Completion rate: solved / 200 (flagship count is 200)
            const completionRate = Math.min(100, (solvedCount / 200) * 100);

            // Average topic mastery
            const totalMastery = profile.topicProgress.reduce((sum, tp) => sum + (tp.masteryScore || 0), 0);
            const avgMastery = profile.topicProgress.length > 0 ? (totalMastery / profile.topicProgress.length) : 0;

            // Revision adherence: solved problems not overdue / total solved
            const nowTime = Date.now();
            const overdueCount = profile.revisionQueue.filter(r => new Date(r.nextRevisionDue).getTime() < nowTime).length;
            const revisionAdherence = profile.revisionQueue.length > 0 
                ? Math.min(100, ((profile.revisionQueue.length - overdueCount) / profile.revisionQueue.length) * 100)
                : 100;

            // Streak bonus: current streak / 30 * 100 (capped at 100)
            const streakBonus = Math.min(100, ((user.streak || 0) / 30) * 100);

            // Overall Readiness Score
            const readinessScore = Math.round(
                (0.35 * completionRate) + 
                (0.35 * avgMastery) + 
                (0.20 * revisionAdherence) + 
                (0.10 * streakBonus)
            );

            // Count solved easy, medium, hard
            let easySolved = 0;
            let mediumSolved = 0;
            let hardSolved = 0;
            let easyTotal = 0;
            let mediumTotal = 0;
            let hardTotal = 0;

            for (const p of allProblems) {
                if (p.difficulty === 'Easy') easyTotal++;
                else if (p.difficulty === 'Medium') mediumTotal++;
                else if (p.difficulty === 'Hard') hardTotal++;

                if (progressMapObj[p.id] === true) {
                    if (p.difficulty === 'Easy') easySolved++;
                    else if (p.difficulty === 'Medium') mediumSolved++;
                    else if (p.difficulty === 'Hard') hardSolved++;
                }
            }

            res.json({
                stats: {
                    solvedCount,
                    solvedPerLanguage,
                    savedTracesCount,
                    streak: user.streak,
                    lastActiveDate: user.lastActiveDate,
                    readinessScore,
                    overdueCount,
                    difficultyBreakdown: {
                        easy: { solved: easySolved, total: easyTotal },
                        medium: { solved: mediumSolved, total: mediumTotal },
                        hard: { solved: hardSolved, total: hardTotal }
                    }
                },
                activityLogs: user.activityLogs || [],
                learningStats
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Complete revision of a problem (doubles space repetition intervals)
    public static async completeRevision(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            if (!firebaseUid) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const { problemId } = req.body;
            if (!problemId) {
                res.status(400).json({ message: 'Problem ID is required' });
                return;
            }

            const profile = await getOrCreateProfile(firebaseUid);
            if (!profile.revisionQueue) {
                profile.revisionQueue = [];
            }
            
            const revisionItem = profile.revisionQueue.find(r => r.problemId === problemId);

            if (!revisionItem) {
                res.status(404).json({ message: 'Problem not found in revision queue. Make sure it is marked solved first.' });
                return;
            }

            // Leitner update rule: double the interval
            revisionItem.revisionCount += 1;
            let nextInterval = 1;
            if (revisionItem.intervalDays === 1) {
                nextInterval = 3;
            } else if (revisionItem.intervalDays === 3) {
                nextInterval = 7;
            } else if (revisionItem.intervalDays === 7) {
                nextInterval = 14;
            } else if (revisionItem.intervalDays === 14) {
                nextInterval = 30;
            } else {
                nextInterval = revisionItem.intervalDays * 2;
            }

            revisionItem.intervalDays = nextInterval;
            revisionItem.lastSolved = new Date();
            revisionItem.nextRevisionDue = new Date(Date.now() + nextInterval * 24 * 60 * 60 * 1000);

            await profile.save();
            res.json({ success: true, revisionQueue: profile.revisionQueue });
        } catch (error) {
            console.error('Error completing revision:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Record trace user interaction event (completion / play / reset / abandon)
    public static async recordTraceEvent(req: AuthRequest, res: Response): Promise<void> {
        try {
            const firebaseUid = req.firebaseUid;
            const { problemId, eventType, stepsViewed, totalSteps } = req.body;

            if (!problemId || !eventType) {
                res.status(400).json({ message: 'problemId and eventType are required' });
                return;
            }

            const event = new TraceEvent({
                userId: firebaseUid || 'anonymous',
                problemId,
                eventType,
                stepsViewed: Number(stepsViewed) || 0,
                totalSteps: Number(totalSteps) || 0
            });

            await event.save();
            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error recording trace event:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
