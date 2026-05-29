import { BusinessRuleError, EntityNotFound, UnauthorizedError } from "../exceptions/exceptions.js";
import { SchedulingRepository } from "../repositories/scheduling.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { UserValidationService } from "./user.validation.service.js";

export class SchedulingService {
    constructor()  { 
        this.schedulingRepository = new SchedulingRepository();
        this.userValidationService = new UserValidationService();
        this.userRepository = new UserRepository();
        
    
    }

    async findAllSchedulings(userId) {
        await this.userValidationService.checkAuthUser(userId);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("Usuário não autorizado!");
        }
        if(user.typeUser !== "FUNCIONARIO") {
            throw new UnauthorizedError(`Somente funcionários conseguem ver todas os agendamentos!`);
        }
        return await this.schedulingRepository.findAll();
    }


    async findMySchedulings(userId) {
        await this.userValidationService.checkAuthUser(userId);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("Usuário não autorizado!");
        }

        return await this.schedulingRepository.findByUserId(userId);
        
    }

    async createScheduling(scheduling, userId) {
        await this.userValidationService.checkAuthUser(userId);
        const schedulingFound = await this.schedulingRepository.findActiveByPlaceIdAndDate(scheduling.placeId, scheduling.date);
        if(schedulingFound) {
            throw new BusinessRuleError("Já existe uma reserva nesse horário!");
        }
       
        return await this.schedulingRepository.create({
            ...scheduling,
            status: "PENDING"
        }, userId);

        
    }

    async cancelMyScheduling(id, userId) {
        await this.userValidationService.checkAuthUser(userId);
        const scheduling = await this.findById(id, userId);
        if (scheduling.status === "CANCELLED") {
            throw new BusinessRuleError("Essa reserva já está cancelada!");
        }

        return await this.schedulingRepository.update(id, {
            status: "CANCELLED"
        });


    }

    async cancelScheduling(id, userId) {
        await this.userValidationService.checkAuthUser(userId);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("Usuário não autorizado!");
        }
        if(user.typeUser !== "FUNCIONARIO") {
            throw new UnauthorizedError("Somente funcionários podem realizar essa ação.");
        }

        const scheduling = await this.schedulingRepository.findBySchedulingId(id);
        if (!scheduling) {
            throw new EntityNotFound(`Reserva não encontrada com o id ${id}`);
        }

        if (scheduling.status === "CANCELLED") {
            throw new BusinessRuleError("Essa reserva já está cancelada!");
        }

        return await this.schedulingRepository.update(id, {
            status: "CANCELLED"
        });

    }
}s