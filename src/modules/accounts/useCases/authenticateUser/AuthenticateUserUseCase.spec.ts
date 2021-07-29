import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: FakeUsersRepository;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to authenticate an user', async () => {
    await createUserUseCase.execute({
      name: 'user test',
      email: 'usertest@email.com',
      password: 'usertestpassword',
      driver_license: '123456',
      is_admin: false,
    });
    const result = await authenticateUserUseCase.execute({
      email: 'usertest@email.com',
      password: 'usertestpassword',
    });
    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'usertest@email.com',
        password: 'usertestpassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'user test',
        email: 'usertest@email.com',
        password: 'usertestpassword',
        driver_license: '123456',
        is_admin: false,
      });
      await authenticateUserUseCase.execute({
        email: 'usertest@email.com',
        password: 'incorrectpassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
