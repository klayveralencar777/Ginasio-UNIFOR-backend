import { AlunoService } from "../services/aluno.service.js";

export class AlunoController {
    constructor() {
        this.alunoService = new AlunoService();
    }

    async findAllAlunos(req, res, next) {
        try {
            const alunos = await this.alunoService.findAllAlunos();
            return res.status(200).json(alunos);
        } catch (error) {
            next(error);
        }
    }

    async findAlunoById(req, res, next) {
        try {
            const { id } = req.params;
            const aluno = await this.alunoService.findAlunoById(id);
            return res.status(200).json(aluno);
        } catch (error) {
            next(error);
        }
    }

    async findAlunoByMatricula(req, res, next) {
        try {
            const { matricula } = req.params;
            const aluno = await this.alunoService.findAlunoByMatricula(matricula);
            return res.status(200).json(aluno);
        } catch (error) {
            next(error);
        }
    }

    async createAluno(req, res, next) {
        try {
            const { user, aluno } = req.body;
            const result = await this.alunoService.createAluno(user, aluno);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateAluno(req, res, next) {
        try {
            const { id } = req.params;
            const { user, aluno } = req.body;
            const result = await this.alunoService.updateAluno(id, user, aluno);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteAluno(req, res, next) {
        try {
            const { id } = req.params;
            await this.alunoService.deleteAluno(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
