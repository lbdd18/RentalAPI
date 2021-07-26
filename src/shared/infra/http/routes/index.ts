import { Router } from 'express';

import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './speficications.routes';
import { carsRoutes } from './cars.routes';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const router = Router();

router.use('/users', usersRoutes);
router.use(authenticateRoutes);
router.use('/cars', ensureAuthenticated, carsRoutes);
router.use('/categories', ensureAuthenticated, categoriesRoutes);
router.use('/specifications', ensureAuthenticated, specificationsRoutes);

export { router };
