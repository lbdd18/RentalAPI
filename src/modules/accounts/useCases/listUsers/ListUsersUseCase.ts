import { injectable, inject } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}

export { ListUsersUseCase };
