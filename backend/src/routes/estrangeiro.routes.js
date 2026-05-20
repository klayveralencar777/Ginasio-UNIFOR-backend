import express from 'express';
import { EstrangeiroController } from '../controllers/estrangeiro.controller.js';

const router = express.Router();
const estrangeiroController = new EstrangeiroController();


router.get('/', (req, res, next) => estrangeiroController.findAllEstrangeiros(req, res, next));


router.get('/:id', (req, res, next) => estrangeiroController.findEstrangeiroById(req, res, next));


router.post('/', (req, res, next) => estrangeiroController.createEstrangeiro(req, res, next));

router.put('/:id', (req, res, next) => estrangeiroController.updateEstrangeiro(req, res, next));


router.delete('/:id', (req, res, next) => estrangeiroController.deleteEstrangeiro(req, res, next));

export default router;
