import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListCarsByAvailabilityUseCase } from './ListCarsByAvailabilityUseCase';

let carsRepository: FakeCarsRepository;
let listCarsByAvailabilityUseCase: ListCarsByAvailabilityUseCase;

describe('List cars by availability', () => {
  beforeEach(() => {
    carsRepository = new FakeCarsRepository();
    listCarsByAvailabilityUseCase = new ListCarsByAvailabilityUseCase(
      carsRepository
    );
  });

  it('should be able list all the available cars', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    const cars = await listCarsByAvailabilityUseCase.execute();

    expect(cars).toEqual([car]);
  });
});
