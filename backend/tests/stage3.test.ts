import mongoose from 'mongoose';
import { UserLearningProfile } from '../src/models/UserLearningProfile';
import { User } from '../src/models/User';
import { RecommendationController } from '../src/controllers/recommendation.controller';
import { FeedbackController } from '../src/controllers/feedback.controller';
import { VisualizationController } from '../src/controllers/visualization.controller';
import { SharedTrace } from '../src/models/SharedTrace';
import { Feedback } from '../src/models/Feedback';
import { RoadmapController } from '../src/controllers/roadmap.controller';
import { AiService } from '../src/services/ai.service';
import * as assert from 'assert';

const TEST_MONGO_URI = 'mongodb://localhost:27017/codeflow_test';

function mockReqRes(firebaseUid?: string, body: any = {}, params: any = {}) {
    const req = {
        firebaseUid,
        user: firebaseUid ? { firebaseUid, displayName: 'Test User' } : undefined,
        body,
        params,
        query: {}
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

async function runTests() {
    console.log("====================================================");
    console.log("🚀 STARTING STAGE 3 INTEGRATION TESTS");
    console.log("====================================================\n");

    let failed = 0;
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
    } catch (e) {
        console.error("Failed to connect to test MongoDB.");
        process.exit(1);
    }

    const testUserId = "test_user_stage3_firebase_uid";

    await test("Personalized Recommendations Endpoint", async () => {
        // Seed user and user profile
        await User.deleteMany({ firebaseUid: testUserId });
        const mockUser = new User({
            firebaseUid: testUserId,
            email: 'test@codeflow.com',
            displayName: 'Test User',
            progress: new Map([['two-sum', true]])
        });
        await mockUser.save();

        await UserLearningProfile.deleteMany({ userId: testUserId });
        const profile = new UserLearningProfile({
            userId: testUserId,
            totalLearningTime: 10,
            totalSolved: 1,
            topicProgress: [
                { topic: 'Trees', solved: [], attempted: ['invert-binary-tree'], masteryScore: 25 },
                { topic: 'Arrays', solved: ['two-sum'], attempted: ['two-sum'], masteryScore: 100 }
            ],
            patternProgress: []
        });
        await profile.save();

        const { req, res } = mockReqRes(testUserId);
        await RecommendationController.getRecommendations(req as any, res as any);

        const data = res.body;
        const status = res.statusCode;

        assert.strictEqual(status, 200, "Should return status 200");
        assert.ok(data, "Should return recommendation data");
        assert.ok(data.problemId, "Should suggest a problem");
        assert.ok(data.reason.includes("Trees") || data.reason.includes("momentum") || data.reason.includes("streak"), "Reason should be populated");

        // Cleanup user
        await User.deleteMany({ firebaseUid: testUserId });
    });

    await test("Testimonial Submission Word Count Validation", async () => {
        // Test short feedback (< 25 words)
        const { req: reqShort, res: resShort } = mockReqRes(testUserId, {
            rating: 5,
            helpedText: "Short feedback.",
            recommend: true
        });
        await FeedbackController.submitFeedback(reqShort as any, resShort as any);
        assert.strictEqual(resShort.statusCode, 400, "Should reject feedback shorter than 25 words");
        assert.ok(resShort.body.message.includes("at least 25 words"), "Error message should mention word count limit");

        // Test long feedback (>= 25 words)
        const longFeedbackText = "This is a very long feedback text that has more than twenty-five words to satisfy the validation requirement of the CodeFlow platform testimonials layer check.";
        const { req: reqLong, res: resLong } = mockReqRes(testUserId, {
            rating: 5,
            helpedText: longFeedbackText,
            recommend: true
        });
        await FeedbackController.submitFeedback(reqLong as any, resLong as any);
        assert.strictEqual(resLong.statusCode, 201, "Should accept feedback of sufficient length");
        assert.ok(resLong.body.feedback, "Should return saved feedback object");
        
        // Cleanup feedback
        await Feedback.deleteMany({ userId: testUserId });
    });

    await test("Visual Trace Sharing and Retrieval Flow", async () => {
        await SharedTrace.deleteMany({ userId: testUserId });

        // Save a shared trace
        const { req: reqShare, res: resShare } = mockReqRes(testUserId, {
            problemId: 'two-sum',
            language: 'cpp',
            code: 'class Solution {};',
            traceSteps: [{ line: 1, variables: {} }],
            complexity: { time: 'O(N)', space: 'O(1)' }
        });
        await VisualizationController.shareTrace(reqShare as any, resShare as any);
        
        const shareData = resShare.body;
        assert.strictEqual(resShare.statusCode, 201, "Should create shared trace");
        assert.ok(shareData.shareId, "Should return unique shareId");

        // Retrieve shared trace
        const { req: reqGet, res: resGet } = mockReqRes(undefined, {}, { shareId: shareData.shareId });
        await VisualizationController.getSharedTrace(reqGet as any, resGet as any);
        
        const getData = resGet.body;
        assert.strictEqual(resGet.statusCode, 200, "Should retrieve shared trace");
        assert.strictEqual(getData.code, 'class Solution {};', "Code should match the shared code");
        assert.strictEqual(getData.problemId, 'two-sum', "Problem ID should match");

        // Cleanup
        await SharedTrace.deleteMany({ userId: testUserId });
    });

    await test("Interview Roadmap Engine Endpoint", async () => {
        // Seed user
        await User.deleteMany({ firebaseUid: testUserId });
        const mockUser = new User({
            firebaseUid: testUserId,
            email: 'test@codeflow.com',
            displayName: 'Test User',
            progress: new Map([['two-sum', true], ['binary-search', true]])
        });
        await mockUser.save();

        const { req, res } = mockReqRes(testUserId);
        await RoadmapController.getRoadmaps(req as any, res as any);

        const data = res.body;
        const status = res.statusCode;

        assert.strictEqual(status, 200, "Should return status 200");
        assert.ok(Array.isArray(data), "Should return array of roadmaps");
        assert.strictEqual(data.length, 6, "Should return exactly 6 roadmaps");
        
        const beginner = data.find((r: any) => r.id === 'beginner');
        assert.ok(beginner, "Should contain beginner roadmap");
        assert.ok(beginner.problems.length > 0, "Roadmap should have problems");
        assert.ok(beginner.completionPercentage > 0, "Completion percentage should be greater than 0 since two-sum is solved");

        // Cleanup
        await User.deleteMany({ firebaseUid: testUserId });
    });

    await test("AI Mentor Review Solution Logic", async () => {
        const aiService = new AiService();
        const review = await aiService.reviewSolution("int main() { return 0; }", "cpp");
        assert.ok(review, "Should return a review response");
        assert.ok(review.includes("Complexity") || review.includes("Review") || review.includes("Time") || review.includes("Complexity Analysis"), "Should contain key review sections");
    });

    await test("Stripe Subscription Limit Enforcement Check", async () => {
        // Seed user with free plan
        await User.deleteMany({ firebaseUid: testUserId });
        const mockUser = new User({
            firebaseUid: testUserId,
            email: 'test@codeflow.com',
            displayName: 'Test User',
            subscriptionPlan: 'free'
        });
        await mockUser.save();

        // Seed daily progress with maximum quota already consumed (5 AI requests for Free plan)
        const { DailyProgress } = require('../src/models/DailyProgress');
        const todayStr = new Date().toISOString().split('T')[0];
        await DailyProgress.deleteMany({ userId: testUserId });
        const mockProgress = new DailyProgress({
            userId: testUserId,
            date: todayStr,
            solvedCount: 0,
            tracesCount: 0,
            revisionsCount: 0,
            aiRequestsCount: 5
        });
        await mockProgress.save();

        // Query the AI route via checkSubscriptionLimits middleware simulation or direct call
        const { checkSubscriptionLimits } = require('../src/middleware/subscription');
        const middleware = checkSubscriptionLimits('ai');
        const { req, res } = mockReqRes(testUserId);
        
        let nextCalled = false;
        const next = () => { nextCalled = true; };

        await middleware(req as any, res as any, next);

        assert.strictEqual(res.statusCode, 403, "Should return 403 Forbidden since quota is exceeded");
        assert.strictEqual(nextCalled, false, "Should not proceed to route handler");
        assert.ok(res.body.message.includes("quota exceeded"), "Error message should mention quota limits");

        // Clean up
        await User.deleteMany({ firebaseUid: testUserId });
        await DailyProgress.deleteMany({ userId: testUserId });
    });

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");

    console.log("====================================================");
    console.log("📊 STAGE 3 INTEGRATION TEST RESULTS SUMMARY");
    console.log("====================================================");
    if (failed === 0) {
        console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
        process.exit(0);
    } else {
        console.log(`🚨 ${failed} TESTS FAILED.`);
        process.exit(1);
    }
}

runTests();
