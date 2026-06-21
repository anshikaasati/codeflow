import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyProgress extends Document {
    userId: string;
    date: string; // YYYY-MM-DD
    solvedCount: number;
    tracesCount: number;
    revisionsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const DailyProgressSchema = new Schema<IDailyProgress>(
    {
        userId: { type: String, required: true, index: true },
        date: { type: String, required: true, index: true },
        solvedCount: { type: Number, required: true, default: 0 },
        tracesCount: { type: Number, required: true, default: 0 },
        revisionsCount: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
);

// Compound index to guarantee uniqueness of (userId, date)
DailyProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

export const DailyProgress = mongoose.model<IDailyProgress>('DailyProgress', DailyProgressSchema);
