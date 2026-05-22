import express from 'express';
import { PlaceController } from '../controllers/place.controller.js';
import { authMiddleware} from '../middlewares/auth.middleware.js';
const router = express.Router();
const placeController = new PlaceController();
router.use(authMiddleware);
router.get('/', (req, res, next) => placeController.findAllPlaces(req, res, next));
router.get('/:id', (req, res, next) => placeController.findPlaceById(req, res, next));
router.post('/', (req, res, next) => placeController.createPlace(req, res, next));
router.put('/:id', (req, res, next) => placeController.updatePlace(req, res, next));
router.delete('/:id', (req, res, next) => placeController.deletePlace(req, res, next));

export default router;