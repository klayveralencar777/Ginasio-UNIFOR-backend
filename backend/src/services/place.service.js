import { PlaceRepository } from "../repositories/place.repository.js";
import { EntityNotFound, UnauthorizedError } from "../exceptions/exceptions.js";
import { UserRepository } from "../repositories/user.repository.js";
import { UserValidationService } from "./user.validation.service.js";

export class PlaceService {
    constructor() {
        this.placeRepository = new PlaceRepository();
        this.userRepository = new UserRepository();
        this.userValidationService = new UserValidationService();
    }

    async findAllPlaces(userId) {
        await this.userValidationService.checkAuthUser(userId);
        await this.userValidationService.checkIsFuncionario(userId);
        return await this.placeRepository.findAll();
    }

    async findPlaceById(id, userId) {
        await this.userValidationService.checkAuthUser(userId);
        await this.userValidationService.checkIsFuncionario(userId);
        const place = await this.placeRepository.findById(id);
        if (!place) {
            throw new EntityNotFound("Lugar não encontrado");
        }
        return place;
    }

    async createPlace(placeData, userId) {
        await this.userValidationService.checkAuthUser(userId);
        await this.userValidationService.checkIsFuncionario(userId);
        return await this.placeRepository.create(placeData, userId);
    }

    async updatePlace(id, placeData, userId) {
        await this.userValidationService.checkAuthUser(userId);
        await this.userValidationService.checkIsFuncionario(userId);
        await this.findPlaceById(id, userId);
        return await this.placeRepository.update(id, placeData);
    }

    async deletePlace(id, userId) {
        await this.userValidationService.checkAuthUser(userId);
        await this.userValidationService.checkIsFuncionario(userId);
        await this.findPlaceById(id, userId);
        await this.placeRepository.delete(id);
    }

}