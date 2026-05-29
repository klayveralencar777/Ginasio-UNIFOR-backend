import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class SchedulingRepository {
    constructor() {}

    async findAll() {
        return await prisma.scheduling.findMany();
    }

    async findByUserId(userId) {
        return await prisma.scheduling.findMany({
            where: { userId }
        });
    }



    async findBySchedulingId(id) {
        return await prisma.scheduling.findUnique({
            where: { id }
        });
    }


    async findByDate(date) {
        return await prisma.scheduling.findFirst({
            where: { date }
        });
    }

   async findByPlaceIdAndDate(placeId, date) {
    return await prisma.scheduling.findFirst({
        where: {
            placeId,
            date
        }
    });
}

    async findActiveByPlaceIdAndDate(placeId, date) {
        return await prisma.scheduling.findFirst({
            where: {
                placeId,
                date,
                status: {
                    not: "CANCELLED"
                }
            }
        });
    }

    async create(scheduling, userId) {
        return await prisma.scheduling.create({ 
            data: { 
                ...scheduling,
                userId
            }
            
        });
    }

    async update(id, data) {
        return await prisma.scheduling.update({
            where: { id },
            data
        });
    }

    
}