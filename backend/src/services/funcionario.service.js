import { FuncionarioRepository } from "../repositories/funcionario.repository.js";
import bcrypt from 'bcrypt';
import { UserValidationService } from "./user.validation.service.js";
import { EntityNotFound } from "../exceptions/exceptions.js";

export class FuncionarioService {
    constructor() {
        this.funcionarioRepository = new FuncionarioRepository();
        this.userValidationService = new UserValidationService();
    }

    async findAllFuncionarios() {
        return await this.funcionarioRepository.findAll();
    }

    async findFuncionarioById(id) {
        const funcionario = await this.funcionarioRepository.findById(id);
        if (!funcionario) {
            throw new EntityNotFound("Funcionário não encontrado");
        }
        return funcionario;
    }

    async findFuncionarioByMatricula(matricula) {
        const funcionario = await this.funcionarioRepository.findByMatricula(matricula);
        if (!funcionario) {
            throw new EntityNotFound("Funcionário não encontrado");
        }
        return funcionario;
    }

    async createFuncionario(userData, funcionarioData) {
        await this.userValidationService.checkUserByEmail(userData.email);
        await this.userValidationService.checkUserByCpf(userData.cpf);

        const hashPassword = await bcrypt.hash(userData.password, 10);

        return await this.funcionarioRepository.create({
            matricula: funcionarioData.matricula,
            user: {
                create: {
                    name: userData.name,
                    email: userData.email,
                    password: hashPassword,
                    cpf: userData.cpf,
                    birthDate: userData.birthDate,
                    phone: userData.phone,
                    typeUser: "FUNCIONARIO"
                    
                }
            }
        });
    }

   async updateFuncionario(id, userData, funcionarioData) {
    await this.findFuncionarioById(id);
    if (userData?.email)            await this.userValidationService.checkUserByEmail(userData.email, id);
    if (userData?.cpf)              await this.userValidationService.checkUserByCpf(userData.cpf, id);
    if (funcionarioData?.matricula) await this.userValidationService.checkUserByMatricula(funcionarioData.matricula, id);

    return await this.funcionarioRepository.update(id, {
        matricula: funcionarioData?.matricula,
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

    async deleteFuncionario(id) {
        await this.findFuncionarioById(id);
        await this.funcionarioRepository.delete(id);
    }
}
