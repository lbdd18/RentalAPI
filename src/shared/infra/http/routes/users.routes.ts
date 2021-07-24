import { Router } from 'express';
import multer from 'multer'

import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.get('/', listUsersController.handle);
usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', uploadAvatar.single("avatar"), ensureAuthenticated, updateUserAvatarController.handle)

export { usersRoutes };