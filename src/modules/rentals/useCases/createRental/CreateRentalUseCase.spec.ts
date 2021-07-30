import { FakeRentalsRepository } from '@modules/rentals/repositories/Fakes/FakeRentalsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepository: FakeRentalsRepository;
let dateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepository = new FakeRentalsRepository();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const dayAdd24Hours = dateProvider.dateAdd24Hours();
    const rental = await createRentalUseCase.execute({
      car_id: 'carID',
      user_id: 'userID',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental with a existant rental with same car', async () => {
    expect(async () => {
      const dayAdd24Hours = dateProvider.dateAdd24Hours();
      await createRentalUseCase.execute({
        car_id: 'carID',
        user_id: 'userID1',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: 'carID',
        user_id: 'userID2',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with a existant rental with same user', async () => {
    expect(async () => {
      const dayAdd24Hours = dateProvider.dateAdd24Hours();
      await createRentalUseCase.execute({
        car_id: 'carID1',
        user_id: 'userID',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: 'carID2',
        user_id: 'userID',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid expected return date', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'carID1',
        user_id: 'userID',
        expected_return_date: dateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
