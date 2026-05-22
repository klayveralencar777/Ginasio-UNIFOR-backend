import express from 'express';
import { AlunoController } from '../controllers/aluno.controller.js';

const router = express.Router();
const alunoController = new AlunoController();
router.get('/', (req, res, next) => alunoController.findAllAlunos(req, res, next));
router.get('/:id', (req, res, next) => alunoController.findAlunoById(req, res, next));
router.get('/matricula/:matricula', (req, res, next) => alunoController.findAlunoByMatricula(req, res, next));
router.post('/', (req, res, next) => alunoController.createAluno(req, res, next));
router.put('/:id', (req, res, next) => alunoController.updateAluno(req, res, next));
router.delete('/:id', (req, res, next) => alunoController.deleteAluno(req, res, next));

export default router;
