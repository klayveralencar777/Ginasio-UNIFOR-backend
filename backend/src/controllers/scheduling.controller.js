import { SchedulingService } from "../services/scheduling.service.js";

export class SchedulingController {
    constructor() { this.schedulingService = new SchedulingService();}

    async findAllSchedulings(req,res,next) {
        try {
            const schedulings = await this.schedulingService.findAllSchedulings(req.user.id);
            return res.status(200).json(schedulings);
            
        } catch (error) {
            next(error);        
        }
    }

    async createScheduling(req,res,next) {
        try {   
            const scheduling = await this.schedulingService.createScheduling(req.body, req.user.id);
            return res.status(201).json(scheduling);
            
            

        } catch (error) {
            next(error);
            
        }
    }
}