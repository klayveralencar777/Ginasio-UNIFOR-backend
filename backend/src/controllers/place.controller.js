import { PlaceService } from "../services/place.service.js";

export class PlaceController {
    constructor() {
        this.placeService = new PlaceService();
    }

    async findAllPlaces(req, res, next) {
        try {
            const places = await this.placeService.findAllPlaces(req.user.id);
            return res.status(200).json(places);
        } catch (error) {
            next(error);
        }
    }

    async findPlaceById(req, res, next) {
        try {
            const { id } = req.params;
            const place = await this.placeService.findPlaceById(id, req.user.id);
            return res.status(200).json(place);
        } catch (error) {
            next(error);
        }
    }

    async createPlace(req, res, next) {
        try {
            const place = await this.placeService.createPlace(req.body, req.user.id);
            return res.status(201).json(place);
        } catch (error) {
            next(error);
        }
    }

    async updatePlace(req, res, next) {
        try {
            const { id } = req.params;
            const place = await this.placeService.updatePlace(id, req.body, req.user.id);
            return res.status(200).json(place);
        } catch (error) {
            next(error);
        }
    }

    async deletePlace(req, res, next) {
        try {
            const { id } = req.params;
            await this.placeService.deletePlace(id, req.user.id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}


