import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { DashboardController } from '../controllers/dashboard.controller';
import { RoadmapController } from '../controllers/roadmap.controller';

const router = Router();

// Get roadmaps data
router.get('/roadmaps', requireAuth, RoadmapController.getRoadmaps);

// Get dashboard statistics
router.get('/', requireAuth, DashboardController.getDashboardStats);

// Get learning profile
router.get('/learning-profile', requireAuth, DashboardController.getLearningProfile);

// Record learning heartbeat (learning time tracking)
router.post('/heartbeat', requireAuth, DashboardController.recordHeartbeat);

// Complete revision of a problem
router.post('/revisions/complete', requireAuth, DashboardController.completeRevision);

// Record trace user interaction event
router.post('/trace-events', requireAuth, DashboardController.recordTraceEvent);

export default router;
