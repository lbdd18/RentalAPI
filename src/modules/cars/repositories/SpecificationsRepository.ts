import { getRepository, Repository } from "typeorm";
import { ICreateSpeficationDTO } from "../dtos/ICreateSpeficationDTO";
import { Specification } from "../entities/Specification";
import { ISpecificationsRepository } from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findAll(): Promise<Specification[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name });
  }

  async create({ name, description }: ICreateSpeficationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });
    return this.repository.save(specification);
  }

}

export { SpecificationsRepository }