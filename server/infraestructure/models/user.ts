
import { Model } from 'mongoose';

import { IUser, UserType } from '@domain/entities';
import { ClassFromModel, IMongooseModelFactory, MongooseSchema } from '@infraestructure.core/database';
import { IdType } from '@domain.core/entity';
import { ObjectId } from 'bson';

export type UserModel = Model<IUser>;

export class User implements ClassFromModel<UserModel> {
  _id: IdType;
  userName: string;
  password: string;
  playerID?: ObjectId;
  type: UserType;
}

export class UserModelBuilder implements IMongooseModelFactory<UserModel> {
  getSchema() {
    return new MongooseSchema<UserModel>({
      userName: {

      },
      password: {

      },
      playerID: {

      },
      type: {

      }      
    });
  }
}