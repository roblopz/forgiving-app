import { IEntity } from '@domain.core/entity/IEntity';

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