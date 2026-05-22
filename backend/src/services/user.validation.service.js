import { CpfAlreadyExists, EmailAlreadyExists, UnauthorizedError } from "../exceptions/exceptions.js";
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

    async checkIsFuncionario(userId) {
         const user = await this.userRepository.findById(userId);
                if(user.typeUser !== "FUNCIONARIO") {
                    throw new UnauthorizedError("Somente funcionários podem realizar essa função!");
                }
    }

    async checkAuthUser(userId) {
        if(!userId) {
            throw new UnauthorizedError("Usuário não autorizado!");        }
    }


}