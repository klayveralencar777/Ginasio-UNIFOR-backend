import { UserService } from "../services/user.service.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
    constructor() {
        this.userService = new UserService();
    }
    
    async login({email, password}) {
        if(!email || !password) {
            throw new Error("Credenciais inválidas, tente novamente");
        }

        const user = await this.userService.findByEmail(email);
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) {
            throw new Error("Senha inválida, tente novamente");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userData = { 
            name :user.name,
            email: user.email, 
            token,
            userId : user.id,

         }
        return userData;

    }

}