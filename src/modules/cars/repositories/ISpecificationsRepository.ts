import { ICreateSpeficationDTO } from '../dtos/ICreateSpeficationDTO';
import { Specification } from '../infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
  findAll(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  create(data: ICreateSpeficationDTO): Promise<Specification>;
}

export { ISpecificationsRepository };
