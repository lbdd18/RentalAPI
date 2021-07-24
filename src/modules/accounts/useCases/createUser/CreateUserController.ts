import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, driver_license, password, isAdmin } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ name, email, driver_license, password, isAdmin });

    return response.status(201).json(user);
  }
}

export { CreateUserController }