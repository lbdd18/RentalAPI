import { injectable, inject } from "tsyringe"
import { hash } from "bcryptjs"

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
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

  async execute({ name, email, driver_license, password, isAdmin }: IRequest): Promise<User> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!")
    }

    const passwordHash = await hash(password, 8);
    const user = await this.usersRepository.create({ name, email, driver_license, password: passwordHash, isAdmin });
    return user;
  }
}

export { CreateUserUseCase }