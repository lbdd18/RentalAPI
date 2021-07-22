import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository }