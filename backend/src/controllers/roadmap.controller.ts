import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { ProblemRegistryService } from '../services/problemRegistry.service';

interface RoadmapDefinition {
    id: string;
    name: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    problemIds: string[];
}

const ROADMAPS: RoadmapDefinition[] = [
    {
        id: 'beginner',
        name: 'Beginner Core',
        description: 'Master core array manipulation, search basics, and linear lists.',
        difficulty: 'Easy',
        problemIds: [
            'reverse-array',
            'find-minimum-and-maximum-in-array',
            'contains-duplicate',
            'two-sum',
            'valid-parentheses',
            'reverse-linked-list',
            'binary-search'
        ]
    },
    {
        id: 'faang',
        name: 'FAANG Premium',
        description: 'Tackle the standard interview patterns required by top-tier tech firms.',
        difficulty: 'Medium',
        problemIds: [
            'two-sum',
            'valid-parentheses',
            'reverse-linked-list',
            'binary-search',
            'invert-binary-tree',
            'koko-eating-bananas',
            'longest-consecutive-sequence',
            'group-anagrams'
        ]
    },
    {
        id: 'amazon',
        name: 'Amazon Ultimate',
        description: 'Focused path covering matrix simulation, window algorithms, and trees.',
        difficulty: 'Medium',
        problemIds: [
            'two-sum',
            'group-anagrams',
            'rotate-array',
            'spiral-matrix',
            'valid-parentheses',
            'invert-binary-tree',
            'koko-eating-bananas'
        ]
    },
    {
        id: 'google',
        name: 'Google Advanced',
        description: 'Deep dive into complex search spaces, multi-dimensional array problems, and backtracking.',
        difficulty: 'Hard',
        problemIds: [
            'longest-consecutive-sequence',
            'search-in-rotated-sorted-array',
            'median-of-two-sorted-arrays',
            'word-search',
            'n-queens'
        ]
    },
    {
        id: 'thirtyDays',
        name: '30-Day Blitz',
        description: 'Compact roadmap designed to review high-impact patterns in 30 days.',
        difficulty: 'Easy',
        problemIds: [
            'contains-duplicate',
            'valid-anagram',
            'two-sum',
            'valid-parentheses',
            'binary-search',
            'reverse-linked-list',
            'invert-binary-tree'
        ]
    },
    {
        id: 'sixtyDays',
        name: '60-Day Comprehensive',
        description: 'Exhaustive interview prep program covering medium-to-hard challenges.',
        difficulty: 'Hard',
        problemIds: [
            'contains-duplicate',
            'valid-anagram',
            'two-sum',
            'valid-parentheses',
            'binary-search',
            'reverse-linked-list',
            'invert-binary-tree',
            'longest-consecutive-sequence',
            'group-anagrams',
            'koko-eating-bananas',
            'word-search'
        ]
    }
];

export class RoadmapController {
    public static async getRoadmaps(req: AuthRequest, res: Response): Promise<void> {
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

            const progressMapObj = Object.fromEntries(user.progress || new Map());

            const result = ROADMAPS.map(roadmap => {
                let solvedCount = 0;
                const problems = roadmap.problemIds.map(pid => {
                    const probInfo = ProblemRegistryService.getProblem(pid);
                    const isCompleted = progressMapObj[pid] === true;
                    if (isCompleted) solvedCount++;
                    return {
                        id: pid,
                        title: probInfo ? probInfo.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : pid,
                        category: probInfo ? probInfo.category : 'Unknown',
                        difficulty: probInfo ? probInfo.difficulty : 'Medium',
                        isCompleted
                    };
                });

                const totalCount = roadmap.problemIds.length;
                const completionPercentage = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;
                
                // readinessMetric matches completionPercentage for initial implementation
                const readinessMetric = completionPercentage;

                return {
                    id: roadmap.id,
                    name: roadmap.name,
                    description: roadmap.description,
                    difficulty: roadmap.difficulty,
                    completionPercentage,
                    readinessMetric,
                    problems
                };
            });

            res.json(result);
        } catch (error) {
            console.error('Error fetching roadmaps:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}
