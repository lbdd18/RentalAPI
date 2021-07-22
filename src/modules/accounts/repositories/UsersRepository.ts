import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
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

  async update({ id, name, email, driver_license, password, isAdmin, avatar }: IUpdateUserDTO): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, { name, email, driver_license, password, isAdmin, avatar });
    await this.repository.save(user);
    return user;
  }

  async updateAvatar(id: string, avatar: string): Promise<User> {
    const user = await this.findById(id);
    user.avatar = avatar;
    await this.repository.save(user);
    return user;
  }

}

export { UsersRepository }