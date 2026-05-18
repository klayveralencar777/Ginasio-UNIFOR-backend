import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository {
    constructor() {}

    async findAll() {
        return await prisma.user.findMany({});
    
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({ 
            where :
            { email }
        });
    }

    async create(data) {
        return await prisma.user.create({ data });
    }
}