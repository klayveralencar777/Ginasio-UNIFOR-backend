import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from 'bcrypt'

export class UserService {
    constructor() { this.userRepository = new UserRepository(); }

    async findAllUsers() {
        return await this.userRepository.findAll();
    }

    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    }

    async createUser(user) {
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userRepository.create({
            name: user.name,
            email: user.email,
            password: hashPassword,
            cpf: user.cpf,
            birthDate: user.birthDate,
            phone: user.phone,
            role: user.role

        });

    }
}