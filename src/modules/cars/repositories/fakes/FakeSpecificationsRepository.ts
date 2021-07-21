import { ICreateSpeficationDTO } from '../../dtos/ICreateSpeficationDTO';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class FakeSpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: FakeSpecificationsRepository;

  constructor() {
    this.specifications = [];
  }

  public static getInstance(): FakeSpecificationsRepository {
    if (!FakeSpecificationsRepository.INSTANCE) {
      FakeSpecificationsRepository.INSTANCE = new FakeSpecificationsRepository();
    }
    return FakeSpecificationsRepository.INSTANCE;
  }

  async findAll(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((s) => s.name === name);
  }

  async create({ name, description }: ICreateSpeficationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);

    return specification;
  }
}

export { FakeSpecificationsRepository };
