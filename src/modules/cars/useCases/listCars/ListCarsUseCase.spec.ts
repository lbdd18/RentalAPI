import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListCarsUseCase } from './ListCarsUseCase';

let carsRepository: FakeCarsRepository;
let listCarsUseCase: ListCarsUseCase;

describe('List Cats', () => {
  beforeEach(() => {
    carsRepository = new FakeCarsRepository();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it('should be able list all cars', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able list the cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    const cars = await listCarsUseCase.execute({ name: 'Name Car' });

    expect(cars).toEqual([car]);
  });

  it('should be able list the cars by brand', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    const cars = await listCarsUseCase.execute({ brand: 'brand car' });

    expect(cars).toEqual([car]);
  });

  it('should be able list the cars by category', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'as-ss-12',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'mycategory',
    });

    const cars = await listCarsUseCase.execute({ category_id: 'mycategory' });

    expect(cars).toEqual([car]);
  });
});
