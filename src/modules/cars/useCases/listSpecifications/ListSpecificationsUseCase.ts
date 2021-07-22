import { injectable, inject } from 'tsyringe'
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository) { }
  async execute(): Promise<Specification[]> {
    return await this.specificationsRepository.findAll();
  }
}

export { ListSpecificationsUseCase };
