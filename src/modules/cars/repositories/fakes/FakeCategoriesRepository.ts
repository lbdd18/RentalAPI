import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: FakeCategoriesRepository;

  constructor() {
    this.categories = [];
  }

  public static getInstance(): FakeCategoriesRepository {
    if (!FakeCategoriesRepository.INSTANCE) {
      FakeCategoriesRepository.INSTANCE = new FakeCategoriesRepository();
    }
    return FakeCategoriesRepository.INSTANCE;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);

    return category;
  }
}

export { FakeCategoriesRepository };
