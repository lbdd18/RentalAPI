import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { IUpdateRentalDTO } from '../dtos/IUpdateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findAllByUser(user_id: string): Promise<Rental[]>;
  findById(id: string): Promise<Rental>;
  findByCar(car_id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  update(data: IUpdateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
