import { Router } from 'express';
import { studentController } from '@/controllers/student.controller';
import { authMiddleware } from '@/middlewares';

const router = Router();

router.use(authMiddleware);

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

export default router;
