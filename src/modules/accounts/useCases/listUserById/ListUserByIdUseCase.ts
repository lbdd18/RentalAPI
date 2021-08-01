import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ListUserByIdUseCase };
