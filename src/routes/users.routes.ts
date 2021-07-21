import { Router } from 'express';

import { ListUsersController } from '../modules/accounts/useCases/listUsers/ListUsersController';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();

usersRoutes.get('/', listUsersController.handle);
usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
