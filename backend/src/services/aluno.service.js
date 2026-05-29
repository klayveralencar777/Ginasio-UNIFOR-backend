import { AlunoRepository } from "../repositories/aluno.repository.js";
import bcrypt from 'bcrypt';
import { UserValidationService } from "./user.validation.service.js";
import { EntityNotFound } from "../exceptions/exceptions.js";
import { TypeUser } from "@prisma/client";

export class AlunoService {
    constructor() {
        this.alunoRepository = new AlunoRepository();
        this.userValidationService = new UserValidationService();
    }

    async findAllAlunos() {
        return await this.alunoRepository.findAll();
    }

    async findAlunoById(id) {
        const aluno = await this.alunoRepository.findById(id);
        if (!aluno) {
            throw new EntityNotFound("Aluno não encontrado");
        }
        return aluno;
    }

    async findAlunoByMatricula(matricula) {
        const aluno = await this.alunoRepository.findByMatricula(matricula);
        if (!aluno) {
            throw new EntityNotFound("Aluno não encontrado");
        }
        return aluno;
    }

    async createAluno(userData, alunoData) {
        await this.userValidationService.checkUserByEmail(userData.email);
        await this.userValidationService.checkUserByCpf(userData.cpf);

        const hashPassword = await bcrypt.hash(userData.password, 10);

        return await this.alunoRepository.create({
            matricula: alunoData.matricula,
            user: {
                create: {
                    name: userData.name,
                    email: userData.email,
                    password: hashPassword,
                    cpf: userData.cpf,
                    birthDate: userData.birthDate,
                    phone: userData.phone,
                    typeUser: "ALUNO"
                
                    
                }
            }
        });
    }

    async updateAluno(id, userData, alunoData) {
    await this.findAlunoById(id);

    if (userData?.email)      await this.userValidationService.checkUserByEmail(userData.email, id);
    if (userData?.cpf)        await this.userValidationService.checkUserByCpf(userData.cpf, id);
    return await this.alunoRepository.update(id, {
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

    async deleteAluno(id) {
        await this.findAlunoById(id);
        await this.alunoRepository.delete(id);
    }
}
