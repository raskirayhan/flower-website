import { Router } from 'express';
import {
  getAISuggestions,
  handleAIChatMessage,
  getAIDashboardInsights,
} from '../controllers/ai.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/search-suggestions', getAISuggestions);
router.post('/chat', handleAIChatMessage);
router.get('/dashboard-insights', authenticate, getAIDashboardInsights);

export default router;
