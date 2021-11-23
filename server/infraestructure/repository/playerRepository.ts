import { inject, injectable } from "inversify";

import { RepositoryFactory } from "./repositoryFactory";
import { Player } from "@infraestructure/models";
import { IPlayerRepository } from "@domain/repository/IPlayerRepository";
import { AppDataContext } from "@infraestructure/appDatacontext";
import { IoCToken } from "@domain/core/IoCToken";

@injectable()
export class PlayerRepository extends RepositoryFactory(Player) implements IPlayerRepository {
  constructor(@inject(IoCToken.AppDataContext) ctx: AppDataContext) {
    super(ctx);
  }
}