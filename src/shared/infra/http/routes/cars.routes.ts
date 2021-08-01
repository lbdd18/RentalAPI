import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { ListCarsByAvailabilityController } from '@modules/cars/useCases/listCarsByAvailability/ListCarsByAvailabilityController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const uploadImages = multer(uploadConfig);

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const listCarsByAvailabilityController = new ListCarsByAvailabilityController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post('/', ensureAdmin, createCarController.handle);
carsRoutes.get('/', listCarsController.handle);
carsRoutes.get('/available', listCarsByAvailabilityController.handle);
carsRoutes.post(
  '/specifications',
  ensureAdmin,
  createCarSpecificationController.handle
);
carsRoutes.post(
  '/images/:id',
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImageController.handle
);

export { carsRoutes };
