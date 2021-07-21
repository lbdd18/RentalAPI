import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../entities/Category';

interface ICategoriesRepository {
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  create(data: ICreateCategoryDTO): Promise<Category>;
}

export { ICategoriesRepository };
