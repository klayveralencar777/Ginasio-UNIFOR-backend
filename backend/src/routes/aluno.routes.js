import express from 'express';
import { AlunoController } from '../controllers/aluno.controller.js';

const router = express.Router();
const alunoController = new AlunoController();

// GET - Listar todos os alunos
router.get('/', (req, res, next) => alunoController.findAllAlunos(req, res, next));

// GET - Buscar aluno por ID
router.get('/:id', (req, res, next) => alunoController.findAlunoById(req, res, next));

// GET - Buscar aluno por matrícula
router.get('/matricula/:matricula', (req, res, next) => alunoController.findAlunoByMatricula(req, res, next));

// POST - Criar novo aluno
router.post('/', (req, res, next) => alunoController.createAluno(req, res, next));

// PUT - Atualizar aluno
router.put('/:id', (req, res, next) => alunoController.updateAluno(req, res, next));

// DELETE - Deletar aluno
router.delete('/:id', (req, res, next) => alunoController.deleteAluno(req, res, next));

export default router;
