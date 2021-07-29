import { injectable, inject } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    const userUpdated = await this.usersRepository.updateAvatar(
      user_id,
      avatar_file
    );

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    return userUpdated;
  }
}

export { UpdateUserAvatarUseCase };
