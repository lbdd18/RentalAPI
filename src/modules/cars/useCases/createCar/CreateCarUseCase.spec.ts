import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: FakeCarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new FakeCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with same license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name Car',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'as-ss-12',
        fine_amount: 60,
        brand: 'brand car',
        category_id: 'mycategory',
      });

      await createCarUseCase.execute({
        name: 'Name Car2',
        description: 'Car description 2',
        daily_rate: 100,
        license_plate: 'as-ss-12',
        fine_amount: 60,
        brand: 'brand car 2',
        category_id: 'mycategory',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    expect(car.available).toBe(true);
  });
});
