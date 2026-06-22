import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityLog {
    title: string;
    type: string;
    createdAt: Date;
}

export interface IUser extends Document {
    firebaseUid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    githubAccessToken?: string;
    progress: Map<string, boolean>;
    selectedLanguage: string;
    preferredLanguage?: 'cpp' | 'python';
    profilePrivacy?: 'public' | 'private';
    subscriptionPlan?: 'free' | 'pro' | 'premium';
    bio?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    gender?: string;
    location?: string;
    birthday?: string;
    xUrl?: string;
    work?: string;
    education?: string;
    skills?: string;
    streak: number;
    lastActiveDate?: Date;
    activityLogs: IActivityLog[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        firebaseUid: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        displayName: { type: String, required: true },
        photoURL: { type: String },
        githubAccessToken: { type: String },
        progress: { type: Map, of: Boolean, default: {} },
        selectedLanguage: { type: String, default: 'cpp' },
        preferredLanguage: { type: String, enum: ['cpp', 'python'], default: 'cpp' },
        profilePrivacy: { type: String, enum: ['public', 'private'], default: 'public' },
        subscriptionPlan: { type: String, enum: ['free', 'pro', 'premium'], default: 'free' },
        bio: { type: String, default: '' },
        githubUrl: { type: String, default: '' },
        linkedinUrl: { type: String, default: '' },
        portfolioUrl: { type: String, default: '' },
        gender: { type: String, default: '' },
        location: { type: String, default: '' },
        birthday: { type: String, default: '' },
        xUrl: { type: String, default: '' },
        work: { type: String, default: '' },
        education: { type: String, default: '' },
        skills: { type: String, default: '' },
        streak: { type: Number, default: 0 },
        lastActiveDate: { type: Date },
        activityLogs: [
            {
                title: { type: String, required: true },
                type: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);

