import { CpfAlreadyExists, EmailAlreadyExists, UnauthorizedError } from "../exceptions/exceptions.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserValidationService {
    constructor() { this.userRepository = new UserRepository()}

    async checkUserByEmail(email, excludeId = null) {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.id !== excludeId) throw new EmailAlreadyExists();
}
    async checkUserByCpf(cpf, excludeId = null) {
    const user = await this.userRepository.findByCpf(cpf);
    if (user && user.id !== excludeId) throw new CpfAlreadyExists();
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
