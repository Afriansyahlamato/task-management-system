import { Router } from 'express';
import { createProject, listProjects } from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, listProjects);
router.post('/', authMiddleware, createProject);

export default router;
