import { inject, injectable } from 'inversify';
import { Arg, Authorized, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Mapper } from '@automapper/core';

import { AppResolver } from '@application.core/decorators';
import { IoCToken } from '@application.core/IoC';
import { IPlayerUpdatedPayload, PlayerDTO, UpdatePlayerInput, PlayerTopics } from '@application/dto/player';
import { UserType } from '@domain/entities';
import { IPlayerRepository } from '@domain/repositories';
import { Player } from '@infraestructure/models';
import { AppValidationError } from '@common/validation/errors';

@injectable()
@Resolver(PlayerDTO)
@AppResolver()
export class PlayerResolver {
  constructor(
    @inject(IoCToken.PlayerRepository) private playerRepo: IPlayerRepository,
    @inject(IoCToken.AppMapper) private mapper: Mapper
  ) {}

  @Query(_returns => [PlayerDTO])
  async getAllPlayers(): Promise<PlayerDTO[]> {
    const allPlayers = await this.playerRepo.getAll();
    return this.mapper.mapArray(allPlayers, PlayerDTO, Player);
  }

  @Query(_returns => PlayerDTO)
  async getPlayer(@Arg("id", _type => String) id: string): Promise<PlayerDTO> {
    const res = await this.playerRepo.get(id);
    return this.mapper.map(res, PlayerDTO, Player);
  }

  @Authorized(UserType.PLAYER)
  @Mutation(_returns => PlayerDTO)
  async updatePlayer(
    @Arg("input") input: UpdatePlayerInput,
    @PubSub(PlayerTopics.PLAYER_UPDATED) publish: Publisher<IPlayerUpdatedPayload>
  ): Promise<PlayerDTO> {
    const target = await this.playerRepo.get(input.id);
    if (!target)
      throw new AppValidationError<{ id: string }>('Not found', { id: `Player not found by id ${input.id}` });

    target.status = input.status;
    target.hateLevel = input.hateLevel;

    const res = this.mapper.map(await this.playerRepo.update(target), PlayerDTO, Player);
    await publish({ data: res });
    return res;
  }

  @Subscription(_returns => PlayerDTO, { topics: [PlayerTopics.PLAYER_UPDATED] })
  onPlayerUpdated(@Root() payload: IPlayerUpdatedPayload): PlayerDTO {
    return payload.data;
  }
}