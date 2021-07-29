import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IUpdateCarDTO } from '@modules/cars/dtos/IUpdateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async find(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const { cars } = this;

    if (name) {
      cars.filter((c) => c.name === name);
    }

    if (brand) {
      cars.filter((c) => c.brand === brand);
    }

    if (category_id) {
      cars.filter((c) => c.category_id === category_id);
    }

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((c) => c.id === id);
  }

  async findByAvailability(): Promise<Car[]> {
    return this.cars.filter((c) => c.available === true);
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
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((c) => c.license_plate === license_plate);
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
    const car = this.cars.find((c) => c.id === id);
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

    return car;
  }
}

export { FakeCarsRepository };
