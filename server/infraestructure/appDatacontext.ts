import { injectable } from "inversify";

import { IEntity } from "@domain/entities";
import { Player } from "./models";

const players: Player[] = [{
  id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
  name: 'Hector',
  hateLevel: 0,
  status: 'WAR'
}, {
  id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  name: 'Gustavo',
  hateLevel: 0,
  status: 'WAR'
}];

@injectable()
export class AppDataContext {
  players = players;

  private sets: { [setName: string]: IEntity[] } = {
    [Player.name]: this.players
  };

  getSet<T extends IEntity>(c: new() => T): T[] {
    return this.sets[c.name] as T[];
  }
}