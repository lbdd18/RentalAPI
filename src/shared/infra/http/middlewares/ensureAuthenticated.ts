import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(
      token,
      '67e26aa03c79d8420046b44f237c0366'
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError('Invalid Token!', 401);
  }
}
