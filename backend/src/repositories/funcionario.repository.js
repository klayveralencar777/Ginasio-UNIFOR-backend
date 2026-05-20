import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class FuncionarioRepository {
    constructor() {}

    async findAll() {
        return await prisma.funcionario.findMany({
            include: { user: true }
        });
    }

    async findById(id) {
        return await prisma.funcionario.findUnique({
            where: { id },
            include: { user: true }
        });
    }

    async findByMatricula(matricula) {
        return await prisma.funcionario.findUnique({
            where: { matricula },
            include: { user: true }
        });
    }

    async create(data) {
        return await prisma.funcionario.create({
            data,
            include: { user: true }
        });
    }

    async update(id, data) {
        return await prisma.funcionario.update({
            where: { id },
            data,
            include: { user: true }
        });
    }

    async delete(id) {
        return await prisma.funcionario.delete({
            where: { id },
            include: { user: true }
        });
    }
}
