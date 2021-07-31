import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private userTokens: UserTokens[];

  constructor() {
    this.userTokens = [];
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, { user_id, refresh_token, expires_date });
    this.userTokens.push(userToken);
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const index = this.userTokens.findIndex((ut) => ut.id === id);
    this.userTokens.splice(index, 1);
  }
}

export { FakeUsersTokensRepository };
