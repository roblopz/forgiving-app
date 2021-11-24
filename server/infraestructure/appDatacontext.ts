import { injectable } from "inversify";

import { IEntity, PlayerStatus, UserType } from "@domain/entities";
import { Player, AppUser } from "./models";

const players: Player[] = [{
  id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
  name: 'Hector',
  hateLevel: 0,
  status: PlayerStatus.WAR
}, {
  id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  name: 'Gustavo',
  hateLevel: 0,
  status: PlayerStatus.WAR
}];

const users: AppUser[] = [{
  id: 'a2a1b4f5-8ee7-4875-a3f8-cd08cfa79a0c',
  userName: 'sama',
  password: 'chavo',
  playerID: players[0].id,
  type: UserType.PLAYER
}, {
  id: '0761b8b7-b798-4243-b0bc-3f61bc49fafc',
  userName: 'chavo',
  password: 'sama',
  playerID: players[1].id,
  type: UserType.PLAYER
}]

@injectable()
export class AppDataContext {
  players = players;
  users = users;

  private sets: { [setName: string]: IEntity[] } = {
    [Player.name]: this.players,
    [AppUser.name]: this.users
  };

  getSet<T extends IEntity>(c: new() => T): T[] {
    return this.sets[c.name] as T[];
  }
}