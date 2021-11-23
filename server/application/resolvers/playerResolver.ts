import { inject, injectable } from "inversify";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Mapper } from "@automapper/core";

import { PlayerDTO, UpdatePlayerInput } from "@application/dto/player";
import { IPlayerService } from '@applicationService/IPlayerService';
import { Player } from "@infraestructure/models";
import { IoCToken } from "@domain/core/IoCToken";
import { AppResolver } from "@application/core/decorators/appResolver";

@injectable()
@Resolver(PlayerDTO)
@AppResolver()
export class PlayerResolver {
  constructor(
    @inject(IoCToken.PlayerService) private playerService: IPlayerService,
    @inject(IoCToken.AppMapper) private mapper: Mapper
  ) {}

  @Query(_returns => [PlayerDTO])
  getAllPlayers(): PlayerDTO[] {
    return this.mapper.mapArray(this.playerService.getAllPlayers(), PlayerDTO, Player);
  }

  @Query(_returns => PlayerDTO)
  getPlayer(@Arg("id", _type => String) id: string): PlayerDTO {
    const res = this.playerService.getPlayer(id);
    return this.mapper.map(res, PlayerDTO, Player);
  }

  @Mutation(_returns => PlayerDTO)
  updatePlayer(@Arg("input") input: UpdatePlayerInput): PlayerDTO {
    return this.mapper.map(this.playerService.updatePlayerData(input.id, input), PlayerDTO, Player);
  }
}