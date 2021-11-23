import { IEntity } from "./IEntity";

export type PlayerStatus = 'WAR' | 'PEACE';

export interface IPlayer extends IEntity {
  name: string;
  status: PlayerStatus;
  hateLevel: number;
}