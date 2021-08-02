import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/accounts/repositories/fakes/FakeUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUsersTokensRepository;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider
    );
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
