import { Router } from 'express';
import { FeedbackController } from '../controllers/feedback.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Submit feedback
router.post('/', requireAuth, FeedbackController.submitFeedback);

// Submit trace execution rating
router.post('/trace-rating', requireAuth, FeedbackController.submitTraceRating);

// Fetch approved feedback for testimonials
router.get('/', FeedbackController.getApprovedFeedback);

// Alias for approved public feedback
router.get('/public', FeedbackController.getApprovedFeedback);

// Admin Moderation: Approve or Reject reviews
router.patch('/admin/:id', requireAuth, FeedbackController.moderateFeedback);

export default router;
