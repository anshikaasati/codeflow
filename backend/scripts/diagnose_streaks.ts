/**
 * Diagnostic script: Show DailyProgress records and streak state for all users.
 * Run with:
 *   npx ts-node --project tsconfig.json --transpileOnly scripts/diagnose_streaks.ts
 */
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../src/models/User';
import { DailyProgress } from '../src/models/DailyProgress';
import { calculateStreaksFromProgress } from '../src/services/activity';

async function diagnose() {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected\n');

    const users = await User.find({});
    const todayStr = new Date().toISOString().split('T')[0];

    for (const user of users) {
        const allProgress = await DailyProgress.find({ userId: user.firebaseUid }).sort({ date: 1 });
        const activeProgress = allProgress.filter(d =>
            (d.solvedCount || 0) > 0 || (d.tracesCount || 0) > 0 ||
            (d.revisionsCount || 0) > 0 || (d.aiRequestsCount || 0) > 0 ||
            (d.mockInterviewsCount || 0) > 0
        );
        const activeDates = activeProgress.map(d => d.date);
        const { currentStreak, maxStreak } = calculateStreaksFromProgress(activeDates, todayStr);

        console.log(`=== ${user.email} ===`);
        console.log(`  DB streak=${user.streak}, DB maxStreak=${user.maxStreak}`);
        console.log(`  Total DailyProgress docs: ${allProgress.length}`);
        console.log(`  Active days (count>0): ${activeDates.length}`);
        if (activeDates.length > 0) {
            console.log(`  Active dates:`, activeDates.join(', '));
            activeProgress.forEach(d => {
                console.log(`    ${d.date}: solved=${d.solvedCount} traces=${d.tracesCount} revisions=${d.revisionsCount} ai=${d.aiRequestsCount} mock=${d.mockInterviewsCount}`);
            });
        }
        console.log(`  Computed → currentStreak=${currentStreak}, maxStreak=${maxStreak}`);
        console.log(`  Correct maxStreak should be: ${Math.max(user.maxStreak || 0, maxStreak)}\n`);
    }

    await mongoose.disconnect();
}

diagnose().catch(err => { console.error(err); process.exit(1); });
