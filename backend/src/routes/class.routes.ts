import { Router } from 'express';
import { classController } from '../controllers/class.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas requerem autenticação
router.use(authMiddleware);

router.get('/', classController.getAll);
router.get('/:id', classController.getById);
router.post('/', classController.create);
router.put('/:id', classController.update);
router.delete('/:id', classController.delete);

export default router;