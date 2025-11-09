import { Router } from 'express';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
import studentRoutes from './student.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/students', studentRoutes);

export default router;
