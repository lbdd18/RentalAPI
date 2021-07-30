import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class FakeRentalsRepository implements IRentalsRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async findByCar(car_id: string): Promise<Rental> {
    return this.rentals.find((r) => r.car_id === car_id && !r.end_date);
  }

  async findByUser(user_id: string): Promise<Rental> {
    return this.rentals.find((r) => r.user_id === user_id && !r.end_date);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      start_date: new Date(),
      expected_return_date,
    });
    this.rentals.push(rental);
    return rental;
  }
}

export { FakeRentalsRepository };
