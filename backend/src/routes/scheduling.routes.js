import express from 'express';
import { SchedulingController } from '../controllers/scheduling.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
const schedulingController = new SchedulingController();

router.use(authMiddleware);
router.get('/', (req, res, next) => schedulingController.findAllSchedulings(req, res, next));
router.get('/me', (req, res, next) => schedulingController.findMySchedulings(req, res, next));
router.post('/', (req, res, next) => schedulingController.createScheduling(req, res, next));
router.delete('/cancel/:id', (req, res, next) => schedulingController.cancelMyScheduling(req, res, next));
router.delete('/cancel/funcionario/:id', (req, res, next) => schedulingController.cancelScheduling(req, res, next));

export default router;