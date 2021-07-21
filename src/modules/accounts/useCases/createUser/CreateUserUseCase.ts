import { injectable, inject } from "tsyringe"
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  driver_license: string;
  isAdmin: boolean;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) { }

  async execute({ name, username, email, driver_license, password, isAdmin }: IRequest): Promise<User> {
    const user = await this.usersRepository.create({ name, username, email, driver_license, password, isAdmin });
    return user;
  }
}

export { CreateUserUseCase }