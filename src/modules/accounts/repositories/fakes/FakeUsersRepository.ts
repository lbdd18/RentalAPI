import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
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

  async create({ name, email, driver_license, password, isAdmin }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { name, email, driver_license, password, isAdmin, created_at: new Date() });

    this.users.push(user);

    return user;
  }

}

export { FakeUsersRepository }