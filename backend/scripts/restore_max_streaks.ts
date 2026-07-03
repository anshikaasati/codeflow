/**
 * Restore script: Properly recalculate and fix maxStreak for all users.
 * - Recalculates from ALL DailyProgress records (no filter on date range)
 * - maxStreak NEVER goes down — takes max of DB value and computed value
 * - Also backfills DailyProgress for users who have solved problems
 *   but have no DailyProgress records (due to old code path gaps)
 *
 * Run with:
 *   npx ts-node --project tsconfig.json --transpileOnly scripts/restore_max_streaks.ts
 */
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../src/models/User';
import { DailyProgress } from '../src/models/DailyProgress';
import { UserSolution } from '../src/models/UserSolution';
import { calculateStreaksFromProgress } from '../src/services/activity';

async function restoreMaxStreaks() {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB\n');

    const users = await User.find({});
    const todayStr = new Date().toISOString().split('T')[0];

    for (const user of users) {
        console.log(`=== ${user.email} ===`);

        // --- Step 1: Backfill DailyProgress from UserSolution timestamps ---
        // If a user solved problems but DailyProgress was never created,
        // create retroactive records based on when solutions were submitted.
        const existingDates = new Set(
            (await DailyProgress.find({ userId: user.firebaseUid })).map(d => d.date)
        );

        const solutions = await UserSolution.find({ userId: user.firebaseUid });
        let backfilled = 0;
        for (const sol of solutions) {
            if (!sol.createdAt) continue;
            // Use the solution's creation date as the activity date
            const d = new Date(sol.createdAt);
            const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
            if (!existingDates.has(dateStr)) {
                // Create a DailyProgress record with solvedCount=1 for this date
                await DailyProgress.findOneAndUpdate(
                    { userId: user.firebaseUid, date: dateStr },
                    { $inc: { solvedCount: 1 } },
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                );
                existingDates.add(dateStr);
                backfilled++;
                console.log(`  Backfilled ${dateStr} (from solution: ${sol.problemId})`);
            }
        }
        if (backfilled > 0) {
            console.log(`  → Backfilled ${backfilled} day(s) from solution history`);
        }

        // --- Step 2: Recalculate streaks from all DailyProgress docs ---
        const allProgress = await DailyProgress.find({ userId: user.firebaseUid }).sort({ date: 1 });
        const activeDates = allProgress
            .filter(d =>
                (d.solvedCount || 0) > 0 || (d.tracesCount || 0) > 0 ||
                (d.revisionsCount || 0) > 0 || (d.aiRequestsCount || 0) > 0 ||
                (d.mockInterviewsCount || 0) > 0
            )
            .map(d => d.date);

        const { currentStreak, maxStreak: computedMax } = calculateStreaksFromProgress(activeDates, todayStr);

        // maxStreak is a historical high-water mark — NEVER decreases
        const newMaxStreak = Math.max(user.maxStreak || 0, computedMax);
        const newCurrentStreak = currentStreak;

        console.log(`  Active dates: [${activeDates.join(', ') || 'none'}]`);
        console.log(`  Computed: currentStreak=${newCurrentStreak}, maxStreak=${newMaxStreak}`);
        console.log(`  DB was:   streak=${user.streak}, maxStreak=${user.maxStreak}`);

        if (user.streak !== newCurrentStreak || user.maxStreak !== newMaxStreak) {
            user.streak = newCurrentStreak;
            user.maxStreak = newMaxStreak;
            await user.save();
            console.log(`  ✅ Updated!`);
        } else {
            console.log(`  ✓ Already correct.`);
        }
        console.log();
    }

    console.log('Done.');
    await mongoose.disconnect();
}

restoreMaxStreaks().catch(err => { console.error(err); process.exit(1); });
