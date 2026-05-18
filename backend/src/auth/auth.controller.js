import { AuthService } from "../auth/auth.service.js";


export class AuthController {
    constructor() {
       this.authService = new AuthService();
    }

    async login(req, res) {
        const{email, password} = req.body;
        try {
            
            const token = await this.authService.login(req.body);
            return res.status(200).json(token);

            
        } catch (error) {
            return res.status(401).json("Login não autorizado");
        }

    }
    
}