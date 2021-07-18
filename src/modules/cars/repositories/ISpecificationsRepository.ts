import { ICreateSpeficationDTO } from '../dtos/ICreateSpeficationDTO';
import { Specification } from '../model/Specification';

interface ISpecificationsRepository {
  findAll(): Specification[];
  findByName(name: string): Specification;
  create(data: ICreateSpeficationDTO): Specification;
}

export { ISpecificationsRepository };
