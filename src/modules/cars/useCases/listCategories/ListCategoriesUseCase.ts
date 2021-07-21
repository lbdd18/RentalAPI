import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { injectable, inject } from 'tsyringe'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.findAll();
  }
}

export { ListCategoriesUseCase };
