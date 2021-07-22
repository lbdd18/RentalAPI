import { ICreateSpeficationDTO } from '../dtos/ICreateSpeficationDTO';
import { Specification } from '../entities/Specification';

interface ISpecificationsRepository {
  findAll(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  create(data: ICreateSpeficationDTO): Promise<Specification>;
}

export { ISpecificationsRepository };
