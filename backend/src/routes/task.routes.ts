import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { listTasks, createTask, updateTask, deleteTask, getTask } from '../controllers/task.controller';

const router = Router();

router.get('/', authMiddleware, listTasks);
router.get('/:id', authMiddleware, getTask);
router.post('/', authMiddleware, createTask);
router.patch('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
