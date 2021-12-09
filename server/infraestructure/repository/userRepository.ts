import { inject, injectable } from 'inversify';

import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IUser } from '@domain/entities';
import { UserModel } from '@infraestructure/models';
import { MongoRepository } from './mongoRepository';
import { AppService } from '@application.core/decorators';
import { IoCToken } from '@application.core/IoC';

@injectable()
@AppService(IoCToken.UserRepository)
export class UserRepository extends MongoRepository<IUser> implements IUserRepository {
  constructor(
    @inject(IoCToken.PlayerModel) private readonly userModel: UserModel
  ) {
    super(userModel);
  }

  async getByUsername(username: string): Promise<IUser> {        
    return await this.userModel.findOne({ userName: username });
  }
}