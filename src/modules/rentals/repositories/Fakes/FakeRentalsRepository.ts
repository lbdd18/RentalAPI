import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IUpdateRentalDTO } from '@modules/rentals/dtos/IUpdateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class FakeRentalsRepository implements IRentalsRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async findAllByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((r) => r.user_id === user_id);
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((r) => r.id === id);
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

  async update({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: IUpdateRentalDTO): Promise<Rental> {
    const rental = this.rentals.find((r) => r.id === id);
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });
    return rental;
  }
}

export { FakeRentalsRepository };
