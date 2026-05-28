import { EstrangeiroRepository } from "../repositories/estrangeiro.repository.js";
import bcrypt from 'bcrypt';
import { UserValidationService } from "./user.validation.service.js";
import { EntityNotFound } from "../exceptions/exceptions.js";

export class EstrangeiroService {
    constructor() {
        this.estrangeiroRepository = new EstrangeiroRepository();
        this.userValidationService = new UserValidationService();
    }

    async findAllEstrangeiros() {
        return await this.estrangeiroRepository.findAll();
    }

    async findEstrangeiroById(id) {
        const estrangeiro = await this.estrangeiroRepository.findById(id);
        if (!estrangeiro) {
            throw new EntityNotFound("Estrangeiro não encontrado");
        }
        return estrangeiro;
    }

    async createEstrangeiro(userData) {
        await this.userValidationService.checkUserByEmail(userData.email);
        await this.userValidationService.checkUserByCpf(userData.cpf);

        const hashPassword = await bcrypt.hash(userData.password, 10);

        return await this.estrangeiroRepository.create({
            user: {
                create: {
                    name: userData.name,
                    email: userData.email,
                    password: hashPassword,
                    cpf: userData.cpf,
                    birthDate: userData.birthDate,
                    phone: userData.phone,
                    typeUser: "ESTRANGEIRO"
                }
            }
        });
    }

    async updateEstrangeiro(id, userData) {
    await this.findEstrangeiroById(id);
    if (userData?.email) await this.userValidationService.checkUserByEmail(userData.email, id);
    if (userData?.cpf)   await this.userValidationService.checkUserByCpf(userData.cpf, id);

    return await this.estrangeiroRepository.update(id, {
        user: {
            update: {
                name: userData?.name,
                email: userData?.email,
                cpf: userData?.cpf,
                phone: userData?.phone,
                birthDate: userData?.birthDate,
            }
        }
    });
}

    async deleteEstrangeiro(id) {
        await this.findEstrangeiroById(id);
        await this.estrangeiroRepository.delete(id);
    }
}
