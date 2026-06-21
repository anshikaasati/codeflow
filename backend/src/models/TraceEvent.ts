import mongoose, { Document, Schema } from 'mongoose';

export interface ITraceEvent extends Document {
    userId?: string;
    problemId: string;
    eventType: 'start' | 'complete' | 'replay' | 'abandon';
    stepsViewed: number;
    totalSteps: number;
    createdAt: Date;
    updatedAt: Date;
}

const TraceEventSchema = new Schema<ITraceEvent>(
    {
        userId: { type: String },
        problemId: { type: String, required: true },
        eventType: { type: String, enum: ['start', 'complete', 'replay', 'abandon'], required: true },
        stepsViewed: { type: Number, required: true, default: 0 },
        totalSteps: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
);

// Indexes for aggregating analytics efficiently
TraceEventSchema.index({ problemId: 1, eventType: 1 });
TraceEventSchema.index({ userId: 1, eventType: 1 });

export const TraceEvent = mongoose.model<ITraceEvent>('TraceEvent', TraceEventSchema);
export default TraceEvent;
