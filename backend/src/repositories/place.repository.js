import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PlaceRepository {
    constructor() {}

    async findAll() {
        return await prisma.place.findMany({
            include: { schedulings: true }
        });
    }

    async findById(id) {
        return await prisma.place.findUnique({
            where: { id },
            include: { schedulings: true }
        });
    }

    async create(data) {
        return await prisma.place.create({
            data,
            include: { schedulings: true }
        });
    }

    async update(id, data) {
        return await prisma.place.update({
            where: { id },
            data,
            include: { schedulings: true }
        });
    }

    async delete(id) {
        return await prisma.place.delete({
            where: { id },
            include: { schedulings: true }
        });
    }
}