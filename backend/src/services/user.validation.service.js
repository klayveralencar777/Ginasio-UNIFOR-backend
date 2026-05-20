import { CpfAlreadyExists, EmailAlreadyExists } from "../exceptions/exceptions.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserValidationService {
    constructor() { this.userRepository = new UserRepository()}

    async checkUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if(user) {
            throw new EmailAlreadyExists(`Já existe um usuário com o email ${email}`);
        }
    }

    async checkUserByCpf(cpf) {
        const user = await this.userRepository.findByCpf(cpf);
        if(user) {
            throw new CpfAlreadyExists(`Já existe um usuário com o cpf ${cpf}`);
        }
    }

}