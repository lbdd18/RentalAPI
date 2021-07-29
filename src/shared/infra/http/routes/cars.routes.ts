import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { ListCarsByAvailabilityController } from '@modules/cars/useCases/listCarsByAvailability/ListCarsByAvailabilityController';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const listCarsByAvailabilityController = new ListCarsByAvailabilityController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post('/', ensureAdmin, createCarController.handle);
carsRoutes.get('/', listCarsController.handle);
carsRoutes.get('/available', listCarsByAvailabilityController.handle);
carsRoutes.post('/specifications', createCarSpecificationController.handle);

export { carsRoutes };
