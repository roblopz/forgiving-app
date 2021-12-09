import { IEntity, ObjectId } from '@domain.core/entity/IEntity';

export enum UserType {
  PLAYER = 'PLAYER',
  ANON = 'ANON'
}

export interface IUser extends IEntity {
  userName: string;
  password: string;
  playerID?: ObjectId;
  type: UserType;
}