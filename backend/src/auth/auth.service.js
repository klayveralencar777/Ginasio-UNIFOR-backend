
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserRepository } from "../repositories/user.repository.js";
import { InvalidCredentials } from '../exceptions/exceptions.js';

export class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    
    async login({email, password}) {
        if(!email || !password) {
            throw new InvalidCredentials("Credenciais inválidas, tente novamente");
        }

        const user = await this.userRepository.findByEmail(email);
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) {
            throw new InvalidCredentials("Senha inválida, tente novamente");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userData = { 
            name :user.name,
            email: user.email, 
            token,
            userId : user.id,
            typeUser: user.typeUser,

         }
        return userData;

    }

}