import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute(): Category[] {
    return this.categoriesRepository.findAll();
  }
}

export { ListCategoriesUseCase };
