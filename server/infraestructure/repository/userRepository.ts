import { inject, injectable } from "inversify";

import { RepositoryFactory } from "./repositoryFactory";
import { AppUser } from "@infraestructure/models";
import { AppDataContext } from "@infraestructure/appDatacontext";
import { IoCToken } from "@domain/core/IoCToken";
import { IUserRepository } from "@domain/repository/IUserRepository";
import { AppService } from "@application/core/decorators/appServiceDecorator";

@injectable()
@AppService(IoCToken.UserRepository)
export class UserRepository extends RepositoryFactory(AppUser) implements IUserRepository {
  constructor(@inject(IoCToken.AppDataContext) ctx: AppDataContext) {
    super(ctx);
  }
}