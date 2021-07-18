import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) { }
  execute(): Specification[] {
    return this.specificationsRepository.findAll();
  }
}

export { ListSpecificationsUseCase };
