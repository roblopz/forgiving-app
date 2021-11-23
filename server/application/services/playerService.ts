import { inject, injectable } from "inversify";

import { IPlayerData, IPlayerService } from "./IPlayerService";
import { IPlayerRepository } from "@domain/repository/IPlayerRepository";
import { Player } from "@infraestructure/models";
import { IoCToken } from "@domain/core/IoCToken";
import { ID } from "@domain/entities";

@injectable()
export class PlayerService implements IPlayerService {
  constructor(@inject(IoCToken.PlayerRepository) private playerRepository: IPlayerRepository) { }
  
  getPlayer(id: ID): Player {
    return this.playerRepository.get(id);
  }

  getAllPlayers(): Player[] {
    return this.playerRepository.getAll();
  }

  updatePlayerData(id: ID, playerData: IPlayerData): Player {
    const target = this.playerRepository.get(id);
    if (!target) throw new Error(`Player with id[${id}] not found`);

    target.status = playerData.status;
    target.hateLevel = playerData.hateLevel;

    return this.playerRepository.update(target);
  }
}