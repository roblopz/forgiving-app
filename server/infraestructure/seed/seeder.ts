import { inject, injectable } from 'inversify';

import { IoCToken } from '@application.core/IoC/tokens';
import { PlayerModel, UserModel } from '@infraestructure/models';
import { PlayerStatus, UserType } from '@domain/entities';

@injectable()
export class Seeder {
  constructor(
    @inject(IoCToken.PlayerModel) private playerModel: PlayerModel,
    @inject(IoCToken.UserModel) private userModel: UserModel,
  ) { }

  async seed() {
    if (!(await this.playerModel.countDocuments())) {
      const players = await this.playerModel.insertMany([{
        name: 'Hector',
        hateLevel: 70,
        status: PlayerStatus.WAR,
        imagePath: '/images/sama.jpg'
      }, {
        name: 'Gustavo',
        hateLevel: 100,
        status: PlayerStatus.PEACE,
        imagePath: '/images/chavo.jpg'
      }]);

      const [p1, p2] = players;

      await this.userModel.insertMany([{
        userName: 'sama',
        password: 'chavo',
        playerID: p1._id,
        type: UserType.PLAYER
      }, {
        userName: 'chavo',
        password: 'sama',
        playerID: p2._id,
        type: UserType.PLAYER
      }]);
    }
  }
}