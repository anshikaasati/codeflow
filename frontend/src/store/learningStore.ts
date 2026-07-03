import { create } from 'zustand';
import { API_URL } from '../config/api';
import { useAuthStore } from './authStore';

export interface TopicProgress {
    topic: string;
    solved: string[];
    attempted: string[];
    accuracy: number;
    averageTime: number;
    masteryScore: number;
}

export interface PatternProgress {
    pattern: string;
    solved: string[];
    attempted: string[];
    masteryScore: number;
}

export interface RevisionQueueItem {
    problemId: string;
    lastSolved: string;
    nextRevisionDue: string;
    intervalDays: number;
    revisionCount: number;
}

export interface UserLearningProfile {
    userId: string;
    totalSolved: number;
    totalTraced: number;
    totalVisualizations: number;
    totalLearningTime: number;
    preferredLearningStyle: 'visual' | 'textual' | 'hands-on';
    strongTopics: string[];
    weakTopics: string[];
    topicProgress: TopicProgress[];
    patternProgress: PatternProgress[];
    revisionQueue?: RevisionQueueItem[];
}

export interface DashboardStats {
    heatmapData: any[];
    streak: number;
    maxStreak: number;
}

interface LearningState {
    profile: UserLearningProfile | null;
    dashboardStats: DashboardStats | null;
    isLoading: boolean;
    error: string | null;
    fetchLearningProfile: () => Promise<void>;
    fetchDashboardStats: () => Promise<void>;
    sendHeartbeat: () => Promise<void>;
    completeRevision: (problemId: string) => Promise<void>;
    submitTraceRating: (problemId: string, rating: number, difficultyRating: 'easy' | 'medium' | 'hard', review?: string, language?: string) => Promise<void>;
    recordTraceEvent: (problemId: string, eventType: 'start' | 'complete' | 'replay' | 'abandon' | 'reveal_solution' | 'reveal_approach' | 'reveal_complexity' | 'reveal_visualization' | 'recommendation_click' | 'daily_challenge_complete' | string, stepsViewed: number, totalSteps: number) => Promise<void>;
}

export const useLearningStore = create<LearningState>((set, get) => ({
    profile: null,
    dashboardStats: null,
    isLoading: false,
    error: null,

    fetchLearningProfile: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        set({ isLoading: true, error: null });
        try {
            const token = await user.getIdToken();
            const res = await fetch(`${API_URL}/api/dashboard/learning-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Failed to fetch learning profile');
            const data = await res.json();
            set({ profile: data, isLoading: false });
        } catch (e: any) {
            console.error(e);
            set({ error: e.message || 'Server error', isLoading: false });
        }
    },

    fetchDashboardStats: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        try {
            const token = await user.getIdToken();
            const res = await fetch(`${API_URL}/api/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.stats) {
                    set({
                        dashboardStats: {
                            heatmapData: data.stats.heatmapData || [],
                            streak: typeof data.stats.streak === 'number' ? data.stats.streak : 0,
                            maxStreak: typeof data.stats.maxStreak === 'number' ? data.stats.maxStreak : 0
                        }
                    });
                }
            }
        } catch (e) {
            console.error('Failed to fetch dashboard stats:', e);
        }
    },

    sendHeartbeat: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        try {
            const token = await user.getIdToken();
            const res = await fetch(`${API_URL}/api/dashboard/heartbeat`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Heartbeat error');
            const data = await res.json();
            if (data?.success && get().profile) {
                // Update local totalLearningTime state dynamically
                set({
                    profile: {
                        ...get().profile!,
                        totalLearningTime: data.totalLearningTime
                    }
                });
            }
        } catch (e) {
            console.error('Failed to send heartbeat:', e);
        }
    },

    completeRevision: async (problemId) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        try {
            const token = await user.getIdToken();
            const res = await fetch(`${API_URL}/api/dashboard/revisions/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ problemId })
            });
            if (!res.ok) throw new Error('Failed to complete revision');
            const data = await res.json();
            if (data?.success && get().profile) {
                set({
                    profile: {
                        ...get().profile!,
                        revisionQueue: data.revisionQueue
                    }
                });
                get().fetchLearningProfile();
                get().fetchDashboardStats();
            }
        } catch (e) {
            console.error('completeRevision error:', e);
        }
    },

    submitTraceRating: async (problemId, rating, difficultyRating, review, language) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        try {
            const token = await user.getIdToken();
            const res = await fetch(`${API_URL}/api/feedback/trace-rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ problemId, rating, difficultyRating, review, language })
            });
            if (!res.ok) throw new Error('Failed to submit trace rating');
        } catch (e) {
            console.error('submitTraceRating error:', e);
        }
    },

    recordTraceEvent: async (problemId, eventType, stepsViewed, totalSteps) => {
        const user = useAuthStore.getState().user;
        try {
            const token = user ? await user.getIdToken() : null;
            await fetch(`${API_URL}/api/dashboard/trace-events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ problemId, eventType, stepsViewed, totalSteps })
            });
            if (eventType === 'complete' || eventType === 'daily_challenge_complete') {
                get().fetchLearningProfile();
                get().fetchDashboardStats();
            }
        } catch (e) {
            console.error('recordTraceEvent error:', e);
        }
    }
}));
