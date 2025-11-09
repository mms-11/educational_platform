import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { Router } from 'express';
import { assessmentController } from '../controllers/assessments.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const router = Router();

router.use(authMiddleware);

router.get('/', assessmentController.getAll);
router.get('/:id', assessmentController.getById);
router.post('/', assessmentController.create);
router.put('/:id', assessmentController.update);
router.delete('/:id', assessmentController.delete);

export default router;