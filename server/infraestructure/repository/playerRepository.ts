import { inject, injectable } from 'inversify';

import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';
import { IPlayer } from '@domain/entities';
import { PlayerModel } from '@infraestructure/models/player';
import { MongoRepository } from './mongoRepository';
import { IoCToken } from '@application.core/IoC';
import { AppService } from '@application.core/decorators';

@injectable()
@AppService(IoCToken.PlayerRepository)
export class PlayerRepository extends MongoRepository<IPlayer> implements IPlayerRepository {
  constructor(
    @inject(IoCToken.PlayerModel) private playerModel: PlayerModel
  ) {    
    super(playerModel);
  }
}