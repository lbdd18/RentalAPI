import { container } from "tsyringe";

import { CategoriesRepository } from "../../modules/cars/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/SpecificationsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);