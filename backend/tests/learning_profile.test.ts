import mongoose from 'mongoose';
import { UserLearningProfile } from '../src/models/UserLearningProfile';
import { DashboardController } from '../src/controllers/dashboard.controller';
import { ProblemRegistryService } from '../src/services/problemRegistry.service';
import * as assert from 'assert';

const TEST_MONGO_URI = 'mongodb://localhost:27017/codeflow_test';

async function runTests() {
    console.log("====================================================");
    console.log("🚀 STARTING LEARNING ANALYTICS FOUNDATION TESTS");
    console.log("====================================================\n");

    let failed = 0;

    // Helper for assertions
    const test = async (name: string, fn: () => Promise<void> | void) => {
        try {
            console.log(`🧪 Running test: ${name}...`);
            await fn();
            console.log(`✅ Passed: ${name}\n`);
        } catch (e: any) {
            console.error(`❌ Failed: ${name}`);
            console.error(e.stack || e.message);
            console.log();
            failed++;
        }
    };

    try {
        await mongoose.connect(TEST_MONGO_URI);
        console.log("Connected to test MongoDB.");
        
        // Initialize Problem Registry
        ProblemRegistryService.initialize();
    } catch (e) {
        console.error("Failed to connect to test MongoDB. Make sure MongoDB is running locally on port 27017.");
        process.exit(1);
    }

    const testUserId = "test_user_firebase_uid_12345";

    // Clean test collection
    await UserLearningProfile.deleteMany({ userId: testUserId });

    await test("Learning Profile Initialization & getOrCreateProfile", async () => {
        const { req, res } = mockReqRes(testUserId);
        
        await DashboardController.getLearningProfile(req as any, res as any);
        
        const profile = await UserLearningProfile.findOne({ userId: testUserId });
        assert.ok(profile, "Profile should be created.");
        assert.strictEqual(profile.totalLearningTime, 0, "Initial learning time should be 0.");
        assert.strictEqual(profile.totalSolved, 0, "Initial solved count should be 0.");
        assert.ok(profile.topicProgress.length > 0, "Topic progress should be pre-populated.");
        assert.ok(profile.patternProgress.length > 0, "Pattern progress should be pre-populated.");
    });

    await test("Heartbeat increments totalLearningTime", async () => {
        const { req, res } = mockReqRes(testUserId);
        
        // Execute heartbeat twice
        await DashboardController.recordHeartbeat(req as any, res as any);
        await DashboardController.recordHeartbeat(req as any, res as any);
        
        const profile = await UserLearningProfile.findOne({ userId: testUserId });
        assert.ok(profile);
        // Each heartbeat adds 0.5 mins
        assert.strictEqual(profile.totalLearningTime, 1.0, "Total learning time should be 1.0 minutes.");
    });

    await test("syncProfileSolvedProblems calculates stats & mastery scores", async () => {
        // Let's mock a progress map with solved problems
        const progressMap = {
            'contains-duplicate': true,
            'two-sum': true,
            'valid-anagram': false // attempted but not solved
        };

        await DashboardController.syncProfileSolvedProblems(testUserId, progressMap);

        const profile = await UserLearningProfile.findOne({ userId: testUserId });
        assert.ok(profile);
        assert.strictEqual(profile.totalSolved, 2, "Solved count should be 2.");
        
        const arraysTopic = profile.topicProgress.find(t => t.topic === 'Arrays');
        assert.ok(arraysTopic, "Arrays topic should exist in progress.");
        assert.ok(arraysTopic.solved.includes('contains-duplicate'), "contains-duplicate should be marked solved.");
        assert.ok(arraysTopic.solved.includes('two-sum'), "two-sum should be marked solved.");
        assert.ok(arraysTopic.attempted.includes('valid-anagram'), "valid-anagram should be marked attempted.");
        
        assert.ok(arraysTopic.masteryScore > 0, "Mastery score should be calculated.");
    });

    await test("completeRevision doubles intervals correctly", async () => {
        // First sync problems to pre-populate revision queue
        const progressMap = { 'contains-duplicate': true };
        await DashboardController.syncProfileSolvedProblems(testUserId, progressMap);

        // Check it has containing item
        let profile = await UserLearningProfile.findOne({ userId: testUserId });
        assert.ok(profile.revisionQueue.length > 0, "Revision item should exist.");
        const item = profile.revisionQueue[0];
        assert.strictEqual(item.intervalDays, 1, "Initial interval should be 1.");

        // Simulate complete revision 1 (doubles from 1 to 3)
        const { req, res } = mockReqRes(testUserId);
        req.body = { problemId: 'contains-duplicate' };
        await DashboardController.completeRevision(req as any, res as any);

        profile = await UserLearningProfile.findOne({ userId: testUserId });
        assert.strictEqual(profile.revisionQueue[0].intervalDays, 3, "Interval should double to 3.");
        assert.strictEqual(profile.revisionQueue[0].revisionCount, 1, "Revision count should be 1.");

        // Simulate complete revision 2 (doubles from 3 to 7)
        const { req: req2, res: res2 } = mockReqRes(testUserId);
        req2.body = { problemId: 'contains-duplicate' };
        await DashboardController.completeRevision(req2 as any, res2 as any);

        profile = await UserLearningProfile.findOne({ userId: testUserId });
        assert.strictEqual(profile.revisionQueue[0].intervalDays, 7, "Interval should double to 7.");
    });

    await test("recordTraceEvent saves event successfully", async () => {
        const { req, res } = mockReqRes(testUserId);
        req.body = {
            problemId: 'contains-duplicate',
            eventType: 'complete',
            stepsViewed: 12,
            totalSteps: 12
        };

        const { TraceEvent } = require('../src/models/TraceEvent');
        await TraceEvent.deleteMany({ userId: testUserId });

        await DashboardController.recordTraceEvent(req as any, res as any);
        assert.strictEqual(res.statusCode, 201);

        const event = await TraceEvent.findOne({ userId: testUserId });
        assert.ok(event, "Trace event should be recorded.");
        assert.strictEqual(event.eventType, 'complete');
        assert.strictEqual(event.stepsViewed, 12);
        
        await TraceEvent.deleteMany({ userId: testUserId });
    });

    await test("submitTraceRating saves rating successfully", async () => {
        const { req, res } = mockReqRes(testUserId);
        req.body = {
            problemId: 'contains-duplicate',
            rating: 5,
            difficultyRating: 'medium'
        };

        const { FeedbackController } = require('../src/controllers/feedback.controller');
        const { TraceRating } = require('../src/models/TraceRating');
        await TraceRating.deleteMany({ userId: testUserId });

        await FeedbackController.submitTraceRating(req as any, res as any);
        assert.strictEqual(res.statusCode, 201);

        const ratingObj = await TraceRating.findOne({ userId: testUserId });
        assert.ok(ratingObj, "Trace rating should be saved.");
        assert.strictEqual(ratingObj.rating, 5);
        assert.strictEqual(ratingObj.difficultyRating, 'medium');

        await TraceRating.deleteMany({ userId: testUserId });
    });

    // Cleanup and close
    await UserLearningProfile.deleteMany({ userId: testUserId });
    await mongoose.disconnect();
    console.log("Disconnected from test MongoDB.");

    console.log("====================================================");
    console.log("📊 LEARNING ANALYTICS FOUNDATION TEST RESULTS SUMMARY");
    console.log("====================================================");
    if (failed === 0) {
        console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
        process.exit(0);
    } else {
        console.log(`🚨 ${failed} TESTS FAILED.`);
        process.exit(1);
    }
}

function mockReqRes(firebaseUid: string) {
    const req = {
        firebaseUid
    };
    const res = {
        status: function(code: number) {
            this.statusCode = code;
            return this;
        },
        json: function(data: any) {
            this.body = data;
            return this;
        },
        statusCode: 200,
        body: null as any
    };
    return { req, res };
}

runTests();
