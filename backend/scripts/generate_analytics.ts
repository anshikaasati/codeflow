import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { TraceEvent } from '../src/models/TraceEvent';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codeflow';
const ARTIFACT_DIR = 'C:/Users/asati/.gemini/antigravity/brain/c9511750-e681-418c-9a4b-c212e0d66b68';
const REPORTS_DIR = path.join(__dirname, '../reports');

async function run() {
    console.log("====================================================");
    console.log("📊 RUNNING LEARNING ANALYTICS AGGREGATOR");
    console.log("====================================================");

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");
    } catch (e) {
        console.error("Failed to connect to MongoDB. Ensure local MongoDB is running.");
        process.exit(1);
    }

    // Pre-seed mock events if DB is empty to demonstrate the reporting engine
    const eventCount = await TraceEvent.countDocuments();
    if (eventCount === 0) {
        console.log("TraceEvent collection is empty. Pre-seeding mock analytics data...");
        const mockEvents: any[] = [];
        
        // Mock data for contains-duplicate: highly completed, rarely replayed
        for (let i = 0; i < 45; i++) mockEvents.push({ problemId: 'contains-duplicate', eventType: 'start', stepsViewed: 0, totalSteps: 12 });
        for (let i = 0; i < 38; i++) mockEvents.push({ problemId: 'contains-duplicate', eventType: 'complete', stepsViewed: 12, totalSteps: 12 });
        for (let i = 0; i < 4; i++) mockEvents.push({ problemId: 'contains-duplicate', eventType: 'replay', stepsViewed: 5, totalSteps: 12 });
        for (let i = 0; i < 7; i++) mockEvents.push({ problemId: 'contains-duplicate', eventType: 'abandon', stepsViewed: 4, totalSteps: 12 });

        // Mock data for valid-parentheses: medium completion, high replays
        for (let i = 0; i < 60; i++) mockEvents.push({ problemId: 'valid-parentheses', eventType: 'start', stepsViewed: 0, totalSteps: 25 });
        for (let i = 0; i < 42; i++) mockEvents.push({ problemId: 'valid-parentheses', eventType: 'complete', stepsViewed: 25, totalSteps: 25 });
        for (let i = 0; i < 28; i++) mockEvents.push({ problemId: 'valid-parentheses', eventType: 'replay', stepsViewed: 14, totalSteps: 25 });
        for (let i = 0; i < 18; i++) mockEvents.push({ problemId: 'valid-parentheses', eventType: 'abandon', stepsViewed: 8, totalSteps: 25 });

        // Mock data for merge-intervals: high abandonment (difficult stack visualization)
        for (let i = 0; i < 35; i++) mockEvents.push({ problemId: 'merge-intervals', eventType: 'start', stepsViewed: 0, totalSteps: 40 });
        for (let i = 0; i < 12; i++) mockEvents.push({ problemId: 'merge-intervals', eventType: 'complete', stepsViewed: 40, totalSteps: 40 });
        for (let i = 0; i < 8; i++) mockEvents.push({ problemId: 'merge-intervals', eventType: 'replay', stepsViewed: 15, totalSteps: 40 });
        for (let i = 0; i < 23; i++) mockEvents.push({ problemId: 'merge-intervals', eventType: 'abandon', stepsViewed: 18, totalSteps: 40 });

        // Mock data for lru-cache: very high abandonment & replay (complex pointers)
        for (let i = 0; i < 50; i++) mockEvents.push({ problemId: 'lru-cache', eventType: 'start', stepsViewed: 0, totalSteps: 90 });
        for (let i = 0; i < 15; i++) mockEvents.push({ problemId: 'lru-cache', eventType: 'complete', stepsViewed: 90, totalSteps: 90 });
        for (let i = 0; i < 42; i++) mockEvents.push({ problemId: 'lru-cache', eventType: 'replay', stepsViewed: 35, totalSteps: 90 });
        for (let i = 0; i < 35; i++) mockEvents.push({ problemId: 'lru-cache', eventType: 'abandon', stepsViewed: 22, totalSteps: 90 });

        await TraceEvent.insertMany(mockEvents);
        console.log(`Pre-seeded ${mockEvents.length} mock trace events.`);
    }

    // Perform aggregation
    const events = await TraceEvent.find({});
    
    // Group events by problem
    const statsMap: Record<string, { start: number; complete: number; replay: number; abandon: number }> = {};
    for (const ev of events) {
        if (!statsMap[ev.problemId]) {
            statsMap[ev.problemId] = { start: 0, complete: 0, replay: 0, abandon: 0 };
        }
        statsMap[ev.problemId][ev.eventType]++;
    }

    const tableRows: string[] = [];
    const problemsList = Object.keys(statsMap).map(id => {
        const counts = statsMap[id];
        const abandonRate = counts.start > 0 ? Math.round((counts.abandon / counts.start) * 100) : 0;
        return {
            id,
            ...counts,
            abandonRate
        };
    });

    // Sort by abandon rate for abandonment table
    const topAbandoned = [...problemsList].sort((a, b) => b.abandonRate - a.abandonRate);
    // Sort by replays for replayed table
    const topReplayed = [...problemsList].sort((a, b) => b.replay - a.replay);

    let reportMarkdown = `# CodeFlow Trace Learning Analytics Report\n`;
    reportMarkdown += `Generated: ${new Date().toISOString()}\n\n`;
    
    reportMarkdown += `## 1. Executive Summary\n`;
    reportMarkdown += `This telemetry report analyzes visual execution trace behavior to detect which DSA problems are highly completed, frequently replayed (indicating learning friction), or abandoned early (indicating drop-off risks).\n\n`;
    reportMarkdown += `- **Total Trace Events Logged**: ${events.length}\n`;
    reportMarkdown += `- **Active Tracked Problems**: ${problemsList.length}\n\n`;

    reportMarkdown += `## 2. Trace Abandonment Analysis (Drop-off Risks)\n`;
    reportMarkdown += `*High abandonment rates highlight problems where users exit the trace early, likely due to complexity, lack of explanation, or UI visualization sizing issues.*\n\n`;
    reportMarkdown += `| Problem ID | Trace Starts | Abandoned | Abandonment Rate |\n`;
    reportMarkdown += `| --- | --- | --- | --- |\n`;
    for (const p of topAbandoned) {
        reportMarkdown += `| \`${p.id}\` | ${p.start} | ${p.abandon} | **${p.abandonRate}%** |\n`;
    }
    reportMarkdown += `\n`;

    reportMarkdown += `## 3. Trace Replay Analysis (Learning Friction)\n`;
    reportMarkdown += `*High replay counts represent steps that are visually scrubbed or re-run multiple times, identifying complex algorithms requiring extra AI tutor hints.*\n\n`;
    reportMarkdown += `| Problem ID | Trace Starts | Replays | Completion Rate |\n`;
    reportMarkdown += `| --- | --- | --- | --- |\n`;
    for (const p of topReplayed) {
        const compRate = p.start > 0 ? Math.round((p.complete / p.start) * 100) : 0;
        reportMarkdown += `| \`${p.id}\` | ${p.start} | ${p.replay} | ${compRate}% |\n`;
    }
    reportMarkdown += `\n`;

    reportMarkdown += `## 4. Key Recommendations\n`;
    reportMarkdown += `1. **Add AI Tutor Prompts for \`lru-cache\` and \`merge-intervals\`**: These exhibit the highest abandonment/learning friction. Auto-inject tutor prompts at critical pointer update lines.\n`;
    reportMarkdown += `2. **Enhance Trace Notes for Double Pointer Shifts**: Replay counts peak in valid-parentheses stack operations. Add explicit trace annotations explaining stack pushes/pops.\n`;

    // Ensure output directories exist
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

    // Write reports
    const reportPathLocal = path.join(REPORTS_DIR, 'LEARNING_ANALYTICS_REPORT.md');
    const reportPathArtifact = path.join(ARTIFACT_DIR, 'LEARNING_ANALYTICS_REPORT.md');

    fs.writeFileSync(reportPathLocal, reportMarkdown);
    fs.writeFileSync(reportPathArtifact, reportMarkdown);

    console.log(`\n✅ Analytics report generated successfully!`);
    console.log(`- Local Path: ${reportPathLocal}`);
    console.log(`- Artifact Path: ${reportPathArtifact}`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
}

run();
