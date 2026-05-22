import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class SchedulingRepository {
    constructor() {}

    async findAll() {
        return await prisma.scheduling.findMany();
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

    async create(scheduling, userId) {
        return await prisma.scheduling.create({ 
            data: { 
                ...scheduling,
                userId
            }
            
        });
    }

    
}