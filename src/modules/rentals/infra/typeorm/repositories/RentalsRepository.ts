import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IUpdateRentalDTO } from '@modules/rentals/dtos/IUpdateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findAllByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async findByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id, end_date: null });
  }

  async findByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id, end_date: null });
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      start_date: new Date(),
      expected_return_date,
    });
    return this.repository.save(rental);
  }

  async update({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: IUpdateRentalDTO): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    return this.repository.save(rental);
  }
}

export { RentalsRepository };
