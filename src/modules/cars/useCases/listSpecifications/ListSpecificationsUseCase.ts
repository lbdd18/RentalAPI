import { injectable, inject } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.findAll();
  }
}

export { ListSpecificationsUseCase };
