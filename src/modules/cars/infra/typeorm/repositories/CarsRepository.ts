import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IUpdateCarDTO } from '@modules/cars/dtos/IUpdateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async find(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder('c');

    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    return carsQuery.getMany();
  }

  findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }

  async findByAvailability(): Promise<Car[]> {
    return this.repository.find({ available: true });
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async update({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: IUpdateCarDTO): Promise<Car> {
    const car = await this.repository.findOne({ id });

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    return this.repository.save(car);
  }
}

export { CarsRepository };
