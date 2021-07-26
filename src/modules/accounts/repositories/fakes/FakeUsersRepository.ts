import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    return this.users.find(u => u.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(u => u.email === email);
  }

  async create({ name, email, driver_license, password, is_admin }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { name, email, driver_license, password, is_admin, created_at: new Date() });

    this.users.push(user);

    return user;
  }

  async update({ id, name, email, driver_license, password, is_admin, avatar }: IUpdateUserDTO): Promise<User> {
    const user = this.users.find(u => u.id === id);
    Object.assign(user, { name, email, driver_license, password, is_admin, avatar });
    return user;
  }

  async updateAvatar(id: string, avatar: string): Promise<User> {
    const user = this.users.find(u => u.id === id);
    user.avatar = avatar;
    return user;
  }

}

export { FakeUsersRepository }