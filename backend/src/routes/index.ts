import { Router } from 'express';
import authRoutes from './auth.routes.ts';
import projectRoutes from './project.routes.ts';
import taskRoutes from './task.routes.ts';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

export default router;
