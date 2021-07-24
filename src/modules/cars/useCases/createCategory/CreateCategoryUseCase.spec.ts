import { AppError } from "@shared/errors/AppError";
import { FakeCategoriesRepository } from "@modules/cars/repositories/fakes/FakeCategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: FakeCategoriesRepository;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  })

  it("should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({ name: "Category test name", description: "Category test description" });

    expect(category).toHaveProperty("id");
  });

  it("should not be able to create a new category with same name", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({ name: "Category test name", description: "Category test description" });
      await createCategoryUseCase.execute({ name: "Category test name", description: "Category test description" })
    }).rejects.toBeInstanceOf(AppError);
  });
})