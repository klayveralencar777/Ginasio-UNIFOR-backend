import express from 'express';
import { FuncionarioController } from '../controllers/funcionario.controller.js';

const router = express.Router();
const funcionarioController = new FuncionarioController();
router.get('/', (req, res, next) => funcionarioController.findAllFuncionarios(req, res, next));
router.get('/:id', (req, res, next) => funcionarioController.findFuncionarioById(req, res, next));
router.get('/matricula/:matricula', (req, res, next) => funcionarioController.findFuncionarioByMatricula(req, res, next));
router.post('/', (req, res, next) => funcionarioController.createFuncionario(req, res, next));
router.put('/:id', (req, res, next) => funcionarioController.updateFuncionario(req, res, next));
router.delete('/:id', (req, res, next) => funcionarioController.deleteFuncionario(req, res, next));

export default router;
