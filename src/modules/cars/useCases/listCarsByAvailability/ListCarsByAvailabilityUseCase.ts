import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListCarsByAvailabilityUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    return this.carsRepository.findByAvailability();
  }
}

export { ListCarsByAvailabilityUseCase };
