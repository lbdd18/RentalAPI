import { getRepository, Repository } from 'typeorm';

import { ICreateSpeficationDTO } from '@modules/cars/dtos/ICreateSpeficationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findAll(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  async create({
    name,
    description,
  }: ICreateSpeficationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });
    return this.repository.save(specification);
  }
}

export { SpecificationsRepository };
