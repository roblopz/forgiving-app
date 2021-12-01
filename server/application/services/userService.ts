import { inject, injectable } from "inversify";

import { AppUser } from "@infraestructure/models";
import { IoCToken } from "@domain/core/IoCToken";
import { ID } from "@domain/entities";
import { IUserRepository } from "@domain/repository/IUserRepository";
import { AppService } from "@applicationCore/decorators/appServiceDecorator";
import { IUserService } from "@domain/service";

@injectable()
@AppService(IoCToken.UserService)
export class UserService implements IUserService {
  constructor(@inject(IoCToken.UserRepository) private userRepository: IUserRepository) { }  

  get(id: ID): AppUser {
    return this.userRepository.get(id);
  }

  getByUserName(username: string): AppUser {
    return this.userRepository.getAll().find(x => x.userName.toLowerCase() === username.toLowerCase());
  }
}