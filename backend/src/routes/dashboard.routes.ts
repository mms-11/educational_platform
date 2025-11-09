import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

router.get('/stats', dashboardController.getStats);
router.get('/upcoming-assessments', dashboardController.getUpcomingAssessments);
router.get('/recent-activities', dashboardController.getRecentActivities);
router.get('/performance', dashboardController.getPerformance);

export default router;
