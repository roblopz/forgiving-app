import { IEntity } from "./IEntity";

export enum PlayerStatus {
  WAR = 'WAR',
  PEACE = 'PEACE'
}

export interface IPlayer extends IEntity {
  name: string;
  status: PlayerStatus;
  hateLevel: number;
  imagePath?: string;
}