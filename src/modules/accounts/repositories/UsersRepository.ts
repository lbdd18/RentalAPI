import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email })
  }

  async create({ name, email, driver_license, password, isAdmin }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name, email, driver_license, password, isAdmin
    });
    await this.repository.save(user);
    return user;
  }

}

export { UsersRepository }