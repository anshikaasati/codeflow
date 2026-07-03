import mongoose, { Document, Schema } from 'mongoose';

export interface ISharedTrace extends Document {
    shareId: string; // Unique short key (e.g., k9a3f2)
    problemId: string;
    language: string;
    code: string;
    traceSteps: any[];
    complexity: {
        time: string;
        space: string;
    };
    userId?: string; // Optional creator UID
    createdAt: Date;
    updatedAt: Date;
}

const SharedTraceSchema = new Schema<ISharedTrace>(
    {
        shareId: { type: String, required: true, unique: true, index: true },
        problemId: { type: String, required: true, default: 'sandbox' },
        language: { type: String, required: true, default: 'cpp' },
        code: { type: String, required: true },
        traceSteps: { type: Schema.Types.Mixed, required: true },
        complexity: {
            time: { type: String, default: 'O(N)' },
            space: { type: String, default: 'O(N)' }
        },
        userId: { type: String }
    },
    { timestamps: true }
);

export const SharedTrace = mongoose.model<ISharedTrace>('SharedTrace', SharedTraceSchema);
