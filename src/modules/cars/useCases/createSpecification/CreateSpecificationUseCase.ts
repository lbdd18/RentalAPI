import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specicationsRepository: ISpecificationsRepository) { }

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specicationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    const specification = await this.specicationsRepository.create({ name, description });
    return specification;
  }
}

export { CreateSpecificationUseCase };
