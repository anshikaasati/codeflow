import { IUser } from '../models/User';
import { DailyProgress } from '../models/DailyProgress';

/**
 * Calculates current and max streak from unique sorted progress date strings (YYYY-MM-DD).
 */
export function calculateStreaksFromProgress(progressDates: string[], todayStr: string): { currentStreak: number, maxStreak: number } {
    if (progressDates.length === 0) {
        return { currentStreak: 0, maxStreak: 0 };
    }

    // Deduplicate and sort dates ascending
    const uniqueDates = Array.from(new Set(progressDates)).sort();

    const parseUTCDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    };

    const getDaysDiff = (date1: Date, date2: Date) => {
        const timeDiff = date2.getTime() - date1.getTime();
        return Math.round(timeDiff / (1000 * 60 * 60 * 24));
    };

    // Calculate Max Streak
    let maxStreak = 1;
    let currentRun = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
        const prev = parseUTCDate(uniqueDates[i - 1]);
        const curr = parseUTCDate(uniqueDates[i]);
        const diff = getDaysDiff(prev, curr);

        if (diff === 1) {
            currentRun++;
        } else if (diff > 1) {
            currentRun = 1;
        }
        if (currentRun > maxStreak) {
            maxStreak = currentRun;
        }
    }

    // Calculate Current Streak (active if last active date is today or yesterday)
    let currentStreak = 0;
    const lastDateStr = uniqueDates[uniqueDates.length - 1];
    const lastDate = parseUTCDate(lastDateStr);
    const today = parseUTCDate(todayStr);
    const diffToToday = getDaysDiff(lastDate, today);

    if (diffToToday <= 1) {
        currentStreak = 1;
        for (let i = uniqueDates.length - 2; i >= 0; i--) {
            const curr = parseUTCDate(uniqueDates[i]);
            const next = parseUTCDate(uniqueDates[i + 1]);
            const diff = getDaysDiff(curr, next);

            if (diff === 1) {
                currentStreak++;
            } else if (diff > 1) {
                break;
            }
        }
    }

    return { currentStreak, maxStreak };
}

/**
 * Dynamically updates the user's daily learning streak and activity history.
 * Fetches all daily progress events to guarantee mathematically correct streaks.
 */
export async function recordUserActivity(user: IUser, timezoneOffset?: number): Promise<void> {
    const now = new Date();
    let localTime = now;
    if (timezoneOffset !== undefined) {
        localTime = new Date(now.getTime() - timezoneOffset * 60 * 1000);
    }
    const year = localTime.getUTCFullYear();
    const month = String(localTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(localTime.getUTCDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    // Query all daily progress to compute streaks
    const progressList = await DailyProgress.find({ userId: user.firebaseUid }).sort({ date: 1 });
    
    // Filter active dates (where count of any activity is greater than 0)
    const progressDates = progressList
        .filter(d => 
            (d.solvedCount || 0) > 0 || 
            (d.tracesCount || 0) > 0 || 
            (d.revisionsCount || 0) > 0 || 
            (d.aiRequestsCount || 0) > 0 || 
            (d.mockInterviewsCount || 0) > 0
        )
        .map(d => d.date);

    // If today is not in the progress list, temporarily add it since they are active right now
    if (!progressDates.includes(todayStr)) {
        progressDates.push(todayStr);
    }

    const { currentStreak, maxStreak } = calculateStreaksFromProgress(progressDates, todayStr);

    const oldStreak = user.streak;
    user.streak = currentStreak;
    // Keep the highest streak historically achieved
    user.maxStreak = Math.max(user.maxStreak || 0, maxStreak);
    user.lastActiveDate = now;

    // Add activity log if streak started or kept up
    if (oldStreak === 0 && currentStreak > 0) {
        user.activityLogs.unshift({
            title: 'Started a new learning streak! 🚀',
            type: 'streak_start',
            createdAt: now
        });
    } else if (currentStreak > oldStreak) {
        user.activityLogs.unshift({
            title: `Kept up the streak! Day ${currentStreak} 🚀`,
            type: 'streak_keep',
            createdAt: now
        });
    }

    // Retain only the most recent 20 activities to optimize DB storage
    if (user.activityLogs.length > 20) {
        user.activityLogs = user.activityLogs.slice(0, 20);
    }

    await user.save();
    console.log(`[recordUserActivity] Synced user ${user.email} (Streak: ${user.streak}, MaxStreak: ${user.maxStreak})`);
}
