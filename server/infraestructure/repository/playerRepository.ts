import { inject, injectable } from 'inversify';

import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';
import { IPlayer } from '@domain/entities';
import { PlayerModel } from '@infraestructure/models/player';
import { MongoRepository } from './mongoRepository';
import { IoCToken } from '@application.core/IoC/tokens';
import { AppRepository } from '@application.core/decorators/appRepository';

@injectable()
@AppRepository(IoCToken.PlayerRepository)
export class PlayerRepository extends MongoRepository<IPlayer> implements IPlayerRepository {
  constructor(
    @inject(IoCToken.PlayerModel) playerModel: PlayerModel
  ) {
    super(playerModel);
  }
}