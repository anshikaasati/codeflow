import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { UserPreferenceController } from '../controllers/userPreference.controller';

const router = Router();

// Get preferred language
router.get('/', requireAuth, UserPreferenceController.getPreferences);

// Update preferred language
router.patch('/', requireAuth, UserPreferenceController.updatePreferences);

export default router;
