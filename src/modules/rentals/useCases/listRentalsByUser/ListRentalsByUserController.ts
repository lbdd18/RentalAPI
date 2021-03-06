import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listrentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listrentalsByUserUseCase.execute({ user_id: id });

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };
