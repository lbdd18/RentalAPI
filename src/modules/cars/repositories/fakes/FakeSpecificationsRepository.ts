import { ICreateSpeficationDTO } from '../../dtos/ICreateSpeficationDTO';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class FakeSpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async findAll(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((s) => s.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((s) => ids.includes(s.id));
  }

  async create({
    name,
    description,
  }: ICreateSpeficationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);

    return specification;
  }
}

export { FakeSpecificationsRepository };
