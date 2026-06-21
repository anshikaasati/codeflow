import mongoose, { Document, Schema } from 'mongoose';

export interface ITraceRating extends Document {
    userId: string;
    problemId: string;
    rating: number; // 1 to 5
    difficultyRating: 'easy' | 'medium' | 'hard';
    createdAt: Date;
    updatedAt: Date;
}

const TraceRatingSchema = new Schema<ITraceRating>(
    {
        userId: { type: String, required: true },
        problemId: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        difficultyRating: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
    },
    { timestamps: true }
);

// Optimize retrieval of problem trace rating stats
TraceRatingSchema.index({ problemId: 1, rating: 1 });

export const TraceRating = mongoose.model<ITraceRating>('TraceRating', TraceRatingSchema);
export default TraceRating;
