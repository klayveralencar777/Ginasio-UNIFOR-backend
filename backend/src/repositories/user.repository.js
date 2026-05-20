import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository {
    constructor() {}

    async findAll() {
        return await prisma.user.findMany({});
    
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({ 
            where : { email }
        });
    }


    async findById(id) {
        return await prisma.user.findUnique({
            where: { id }
        })
    }

    async findByCpf(cpf) {
        return await prisma.user.findUnique({
            where: { cpf }
        })
    }
    

    async create(data) {
        return await prisma.user.create({ data });
    }

    async update(id, data) {
        return await prisma.user.update({
            where: { id},
            ...data
        })
    }

    async delete(id) {
        return await prisma.user.delete({
            where: { id }
        })
    }
}