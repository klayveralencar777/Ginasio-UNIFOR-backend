import { EstrangeiroService } from "../services/estrangeiro.service.js";

export class EstrangeiroController {
    constructor() {
        this.estrangeiroService = new EstrangeiroService();
    }

    async findAllEstrangeiros(req, res, next) {
        try {
            const estrangeiros = await this.estrangeiroService.findAllEstrangeiros();
            return res.status(200).json(estrangeiros);
        } catch (error) {
            next(error);
        }
    }

    async findEstrangeiroById(req, res, next) {
        try {
            const { id } = req.params;
            const estrangeiro = await this.estrangeiroService.findEstrangeiroById(id);
            return res.status(200).json(estrangeiro);
        } catch (error) {
            next(error);
        }
    }

    async createEstrangeiro(req, res, next) {
        try {
            const { user } = req.body;
            const result = await this.estrangeiroService.createEstrangeiro(user);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateEstrangeiro(req, res, next) {
        try {
            const { id } = req.params;
            const { user } = req.body;
            const result = await this.estrangeiroService.updateEstrangeiro(id, user);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteEstrangeiro(req, res, next) {
        try {
            const { id } = req.params;
            await this.estrangeiroService.deleteEstrangeiro(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
