import { BusinessRuleError } from "../exceptions/exceptions.js";
import { SchedulingRepository } from "../repositories/scheduling.repository.js";
import { UserValidationService } from "./user.validation.service.js";

export class SchedulingService {
    constructor()  { 
        this.schedulingRepository = new SchedulingRepository();
        this.userValidationService = new UserValidationService();
    
    }


    async findAllSchedulings(userId) {
        await this.userValidationService.checkAuthUser(userId);
        return await this.schedulingRepository.findAll();
    }

    async createScheduling(scheduling, userId) {
        await this.userValidationService.checkAuthUser(userId);
        const schedulingFound = await this.schedulingRepository.findByPlaceIdAndDate(scheduling.placeId, scheduling.date);
        if(schedulingFound) {
            throw new BusinessRuleError("Já existe uma reserva nesse horário!");
        }
       
        return await this.schedulingRepository.create(scheduling, userId);

        
    }
}