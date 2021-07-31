import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalsRoutes } from './rentals.routes';
import { specificationsRoutes } from './speficications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use(authenticateRoutes);
router.use('/password', passwordRoutes);
router.use('/cars', ensureAuthenticated, carsRoutes);
router.use('/categories', ensureAuthenticated, categoriesRoutes);
router.use('/specifications', ensureAuthenticated, specificationsRoutes);
router.use('/rentals', ensureAuthenticated, rentalsRoutes);

export { router };
