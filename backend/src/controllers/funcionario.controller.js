import { FuncionarioService } from "../services/funcionario.service.js";

export class FuncionarioController {
    constructor() {
        this.funcionarioService = new FuncionarioService();
    }

    async findAllFuncionarios(req, res, next) {
        try {
            const funcionarios = await this.funcionarioService.findAllFuncionarios();
            return res.status(200).json(funcionarios);
        } catch (error) {
            next(error);
        }
    }

    async findFuncionarioById(req, res, next) {
        try {
            const { id } = req.params;
            const funcionario = await this.funcionarioService.findFuncionarioById(id);
            return res.status(200).json(funcionario);
        } catch (error) {
            next(error);
        }
    }

    async findFuncionarioByMatricula(req, res, next) {
        try {
            const { matricula } = req.params;
            const funcionario = await this.funcionarioService.findFuncionarioByMatricula(matricula);
            return res.status(200).json(funcionario);
        } catch (error) {
            next(error);
        }
    }

    async createFuncionario(req, res, next) {
        try {
            const { user, funcionario } = req.body;
            const result = await this.funcionarioService.createFuncionario(user, funcionario);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateFuncionario(req, res, next) {
        try {
            const { id } = req.params;
            const { user, funcionario } = req.body;
            const result = await this.funcionarioService.updateFuncionario(id, user, funcionario);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteFuncionario(req, res, next) {
        try {
            const { id } = req.params;
            await this.funcionarioService.deleteFuncionario(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
