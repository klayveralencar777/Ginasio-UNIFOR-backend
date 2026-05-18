import { UserService } from "../services/user.service.js";

export class UserController {
    constructor() { this.userService = new UserService();}

    async findAllUsers(req, res) {
        try {
            const users = await this.userService.findAllUsers();
            return res.status(200).json(users);
            
        } catch (error) {
            return res.status(400).json({error: error.message});
            
        }
    }
    
    async createUser(req, res){
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(201).json(user);
            
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

}
