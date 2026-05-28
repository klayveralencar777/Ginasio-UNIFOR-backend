import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class AlunoRepository {
    constructor() {}

    async findAll() {
        return await prisma.aluno.findMany({
            include: { user: true }
        });
    }

    async findById(id) {
        return await prisma.aluno.findUnique({
            where: { id },
            include: { user: true }
        });
    }

    async findByCpf(cpf) {
        return await prisma.aluno.findUnique({
            where: { cpf },
            include: { user: true }
        });
    }

    async findByMatricula(matricula) {
        return await prisma.aluno.findUnique({
            where: { matricula },
            include: { user: true }
        });
    }

    async create(data) {
        return await prisma.aluno.create({
            data,
            include: { user: true }
        });
    }

    async update(id, data) {
        return await prisma.aluno.update({
            where: { id },
            data,
            include: { user: true }
        });
    }

    async delete(id) {
        return await prisma.aluno.delete({
            where: { id },
            include: { user: true }
        });
    }
}
