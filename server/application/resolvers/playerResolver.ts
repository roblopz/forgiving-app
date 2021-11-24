import { inject, injectable } from "inversify";
import { Arg, Authorized, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from "type-graphql";
import { Mapper } from "@automapper/core";

import { IPlayerUpdatedPayload, PlayerDTO, UpdatePlayerInput } from "@application/dto/player";
import { IPlayerService } from '@applicationService';
import { Player } from "@infraestructure/models";
import { IoCToken } from "@domain/core/IoCToken";
import { AppResolver } from "@application/core/decorators/appResolverDecorator";
import { SubscriptionTopic } from "@application/dto/subscriptionTopic";
import { UserType } from "@domain/entities";

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
  async getPlayer(@Arg("id", _type => String) id: string): Promise<PlayerDTO> {
    const res = this.playerService.getPlayer(id);
    return this.mapper.map(res, PlayerDTO, Player);
  }

  @Authorized(UserType.PLAYER)
  @Mutation(_returns => PlayerDTO)
  async updatePlayer(
    @Arg("input") input: UpdatePlayerInput,
    @PubSub(SubscriptionTopic.PLAYER_UPDATED) publish: Publisher<IPlayerUpdatedPayload>
  ): Promise<PlayerDTO> {
    const res = this.mapper.map(this.playerService.updatePlayerData(input.id, input), PlayerDTO, Player);
    await publish({ data: res });
    return res;
  }

  @Subscription(_returns => PlayerDTO, { topics: [SubscriptionTopic.PLAYER_UPDATED] })
  onPlayerUpdated(@Root() payload: IPlayerUpdatedPayload): PlayerDTO {
    return payload.data;
  }
}