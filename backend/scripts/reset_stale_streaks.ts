/**
 * One-time script: Reset stale streak values in MongoDB.
 * 
 * This recalculates every user's currentStreak from their DailyProgress records
 * (only counting days with actual activity: solves, traces, revisions, AI, mock).
 * 
 * Run with:
 *   npx ts-node --project tsconfig.json --transpileOnly scripts/reset_stale_streaks.ts
 */
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../src/models/User';
import { DailyProgress } from '../src/models/DailyProgress';
import { calculateStreaksFromProgress } from '../src/services/activity';

async function resetStaleStreaks() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error('MONGODB_URI not set in .env');
        process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const users = await User.find({ streak: { $gt: 0 } });
    console.log(`Found ${users.length} users with streak > 0`);

    const now = new Date();
    // Use UTC date for consistency
    const todayStr = now.toISOString().split('T')[0];

    let fixedCount = 0;

    for (const user of users) {
        // Fetch all DailyProgress for this user
        const progressList = await DailyProgress.find({ userId: user.firebaseUid }).sort({ date: 1 });

        // Only count dates with real activity
        const activeDates = progressList
            .filter(d =>
                (d.solvedCount || 0) > 0 ||
                (d.tracesCount || 0) > 0 ||
                (d.revisionsCount || 0) > 0 ||
                (d.aiRequestsCount || 0) > 0 ||
                (d.mockInterviewsCount || 0) > 0
            )
            .map(d => d.date);

        const { currentStreak, maxStreak } = calculateStreaksFromProgress(activeDates, todayStr);

        const oldStreak = user.streak;
        const oldMax = user.maxStreak;

        if (oldStreak !== currentStreak) {
            user.streak = currentStreak;
            // Keep the historical high-water mark for maxStreak
            user.maxStreak = Math.max(oldMax || 0, maxStreak);
            await user.save();
            console.log(
                `  Fixed [${user.email}]: streak ${oldStreak} → ${currentStreak}, maxStreak stays ${user.maxStreak}`
            );
            fixedCount++;
        } else {
            console.log(`  OK    [${user.email}]: streak=${oldStreak} (correct)`);
        }
    }

    console.log(`\nDone. Fixed ${fixedCount} user(s).`);
    await mongoose.disconnect();
}

resetStaleStreaks().catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
});
