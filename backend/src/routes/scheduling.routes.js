import express from 'express';
import { SchedulingController } from '../controllers/scheduling.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
const schedulingController = new SchedulingController();

router.use(authMiddleware);
router.get('/', (req, res, next) => schedulingController.findAllSchedulings(req, res, next));
router.post('/', (req, res, next) => schedulingController.createScheduling(req, res, next));

export default router;