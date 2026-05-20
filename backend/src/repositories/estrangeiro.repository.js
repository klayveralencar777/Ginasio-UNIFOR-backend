import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EstrangeiroRepository {
    constructor() {}

    async findAll() {
        return await prisma.estrangeiro.findMany({
            include: { user: true }
        });
    }

    async findById(id) {
        return await prisma.estrangeiro.findUnique({
            where: { id },
            include: { user: true }
        });
    }

    async create(data) {
        return await prisma.estrangeiro.create({
            data,
            include: { user: true }
        });
    }

    async update(id, data) {
        return await prisma.estrangeiro.update({
            where: { id },
            data,
            include: { user: true }
        });
    }

    async delete(id) {
        return await prisma.estrangeiro.delete({
            where: { id },
            include: { user: true }
        });
    }
}
