import { AuthService } from "../auth/auth.service.js";


export class AuthController {
    constructor() {
       this.authService = new AuthService();
    }

    async login(req, res, next) {
        const{email, password} = req.body;
        try {
            
            const token = await this.authService.login(req.body);
            return res.status(200).json(token);

            
        } catch (error) {
            next(error);
        }

    }
    
}