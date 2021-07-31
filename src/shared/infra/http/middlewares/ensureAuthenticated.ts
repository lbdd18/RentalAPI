import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
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
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken = await usersTokensRepository.findByUserIdAndRefreshToken(
      sub,
      token
    );

    if (!userToken) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: userToken.user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid Token!', 401);
  }
}
