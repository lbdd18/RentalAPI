import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../model/Category';

interface ICategoriesRepository {
  findAll(): Category[];
  findByName(name: string): Category;
  create(data: ICreateCategoryDTO): Category;
}

export { ICategoriesRepository };
