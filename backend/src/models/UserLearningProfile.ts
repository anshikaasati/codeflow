import mongoose, { Document, Schema } from 'mongoose';

export interface ITopicProgress {
    topic: string;
    solved: string[];
    attempted: string[];
    accuracy: number;
    averageTime: number; // in seconds
    masteryScore: number; // 0 to 100
}

export interface IPatternProgress {
    pattern: string;
    solved: string[];
    attempted: string[];
    masteryScore: number; // 0 to 100
}

export interface IRevisionItem {
    problemId: string;
    lastSolved: Date;
    nextRevisionDue: Date;
    intervalDays: number;
    revisionCount: number;
}

export interface IUserLearningProfile extends Document {
    userId: string; // Firebase UID
    totalSolved: number;
    totalTraced: number;
    totalVisualizations: number;
    totalLearningTime: number; // in minutes
    preferredLearningStyle: 'visual' | 'textual' | 'hands-on';
    strongTopics: string[];
    weakTopics: string[];
    topicProgress: ITopicProgress[];
    patternProgress: IPatternProgress[];
    revisionQueue: IRevisionItem[];
    dailyGoal: number; // 1, 3, or 5
    dailyChallenge?: {
        problemId: string;
        date: string; // YYYY-MM-DD
    };
    createdAt: Date;
    updatedAt: Date;
}

const TopicProgressSchema = new Schema<ITopicProgress>({
    topic: { type: String, required: true },
    solved: [{ type: String }],
    attempted: [{ type: String }],
    accuracy: { type: Number, default: 100 },
    averageTime: { type: Number, default: 0 },
    masteryScore: { type: Number, default: 0 }
});

const PatternProgressSchema = new Schema<IPatternProgress>({
    pattern: { type: String, required: true },
    solved: [{ type: String }],
    attempted: [{ type: String }],
    masteryScore: { type: Number, default: 0 }
});

const RevisionItemSchema = new Schema<IRevisionItem>({
    problemId: { type: String, required: true },
    lastSolved: { type: Date, required: true, default: Date.now },
    nextRevisionDue: { type: Date, required: true, default: Date.now },
    intervalDays: { type: Number, required: true, default: 1 },
    revisionCount: { type: Number, required: true, default: 0 }
});

const UserLearningProfileSchema = new Schema<IUserLearningProfile>(
    {
        userId: { type: String, required: true, unique: true, index: true },
        totalSolved: { type: Number, default: 0 },
        totalTraced: { type: Number, default: 0 },
        totalVisualizations: { type: Number, default: 0 },
        totalLearningTime: { type: Number, default: 0 },
        preferredLearningStyle: { 
            type: String, 
            enum: ['visual', 'textual', 'hands-on'], 
            default: 'visual' 
        },
        strongTopics: [{ type: String }],
        weakTopics: [{ type: String }],
        topicProgress: [TopicProgressSchema],
        patternProgress: [PatternProgressSchema],
        revisionQueue: [RevisionItemSchema],
        dailyGoal: { type: Number, default: 1, enum: [1, 3, 5] },
        dailyChallenge: {
            problemId: { type: String },
            date: { type: String }
        }
    },
    { timestamps: true }
);

export const UserLearningProfile = mongoose.model<IUserLearningProfile>('UserLearningProfile', UserLearningProfileSchema);
export default UserLearningProfile;
