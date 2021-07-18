import { ICreateSpeficationDTO } from '../../dtos/ICreateSpeficationDTO';
import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  findAll(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification {
    return this.specifications.find((s) => s.name === name);
  }

  create({ name, description }: ICreateSpeficationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);

    return specification;
  }
}

export { SpecificationsRepository };
