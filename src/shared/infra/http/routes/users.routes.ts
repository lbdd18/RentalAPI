import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ListUserByIdController } from '@modules/accounts/useCases/listUserById/ListUserByIdController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const listUsersController = new ListUsersController();
const listUserByIdController = new ListUserByIdController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.get('/', listUsersController.handle);
usersRoutes.get('/:id', listUserByIdController.handle);
usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  ensureAuthenticated,
  updateUserAvatarController.handle
);

export { usersRoutes };
