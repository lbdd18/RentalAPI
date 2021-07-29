import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IUpdateCarDTO } from '../dtos/IUpdateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  find(name?: string, brand?: string, category_id?: string): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  findByAvailability(): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  update(data: IUpdateCarDTO): Promise<Car>;
}

export { ICarsRepository };
