import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: FakeCarsRepository;
let specificationsRepository: FakeSpecificationsRepository;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new FakeCarsRepository();
    specificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    const specification = await specificationsRepository.create({
      name: 'Specification Name',
      description: 'Specification Description',
    });

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      list_specifications: [specification.id],
    });

    expect(updatedCar.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to the nonexistant car', async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'car_id',
        list_specifications: ['specification_id'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
