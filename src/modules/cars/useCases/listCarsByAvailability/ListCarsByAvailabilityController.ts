import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCarsByAvailabilityUseCase } from './ListCarsByAvailabilityUseCase';

class ListCarsByAvailabilityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarsByAvailabilityUseCase = container.resolve(
      ListCarsByAvailabilityUseCase
    );
    const cars = await listCarsByAvailabilityUseCase.execute();
    return response.json(cars);
  }
}

export { ListCarsByAvailabilityController };
