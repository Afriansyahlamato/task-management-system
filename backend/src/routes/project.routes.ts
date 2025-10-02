import { Router } from 'express';
import { createProject, listProjects } from '../controllers/project.controller.ts';
import { authMiddleware } from '../middleware/auth.ts';

const router = Router();

router.get('/', authMiddleware, listProjects);
router.post('/', authMiddleware, createProject);

export default router;
