import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { RecommendationController } from '../controllers/recommendation.controller';

const router = Router();

router.get('/', requireAuth, RecommendationController.getRecommendations);

export default router;
