import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/accounts/dtos/IUpdateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async create({
    name,
    email,
    driver_license,
    password,
    is_admin,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      is_admin,
    });
    await this.repository.save(user);
    return user;
  }

  async update({
    id,
    name,
    email,
    driver_license,
    password,
    is_admin,
    avatar,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
      is_admin,
      avatar,
    });
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

export { UsersRepository };
