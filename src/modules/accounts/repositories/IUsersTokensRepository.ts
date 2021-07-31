import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
