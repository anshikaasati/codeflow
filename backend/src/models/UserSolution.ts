import mongoose, { Document, Schema } from 'mongoose';

export interface IUserSolution extends Document {
    userId: string; // Firebase UID
    problemId: string;
    language: string;
    version: 'brute' | 'better' | 'optimal';
    code: string;
    lastUpdated: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSolutionSchema = new Schema<IUserSolution>(
    {
        userId: { type: String, required: true },
        problemId: { type: String, required: true },
        language: { type: String, required: true },
        version: { type: String, enum: ['brute', 'better', 'optimal'], default: 'optimal', required: true },
        code: { type: String, required: true },
        lastUpdated: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Compound index for O(1) fetch/update drafts per version
UserSolutionSchema.index({ userId: 1, problemId: 1, language: 1, version: 1 }, { unique: true });

export const UserSolution = mongoose.model<IUserSolution>('UserSolution', UserSolutionSchema);
