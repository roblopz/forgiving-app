import { IEntity } from "./IEntity";
import { ID } from "./types";

export enum UserType {
  PLAYER = 'PLAYER',
  ANON = 'ANON'
}

export interface IAppUser extends IEntity {
  userName: string;
  password: string;
  playerID?: ID;
  type: UserType;
}