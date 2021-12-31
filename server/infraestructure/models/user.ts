
import { Model } from 'mongoose';
import { AutoMap } from '@automapper/classes';

import { IdType, ObjectId } from '@domain.core/entity';
import { IUser, UserType } from '@domain/entities';
import { ClassFromModel, IMongooseSchemaFactory, MongooseSchema } from '@infraestructure.core/models';
import { enumToKeys } from '@common/util/types';
import { AppModel } from '@application.core/decorators/appModel';
import { IoCToken } from '@application.core/IoC/tokens';

export type UserModel = Model<IUser>;

export class User implements ClassFromModel<UserModel> {
  @AutoMap({ typeFn: () => String })
  _id: IdType;

  @AutoMap({ typeFn: () => String })
  userName: string;

  @AutoMap({ typeFn: () => String })
  password: string;

  @AutoMap({ typeFn: () => String })
  playerID?: ObjectId;

  @AutoMap({ typeFn: () => String })
  type: UserType;
}

@AppModel(IoCToken.UserModel)
export class UserModelBuilder implements IMongooseSchemaFactory<UserModel> {
  modelName = 'User';  

  getSchema() {
    return new MongooseSchema<UserModel>({
      userName: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      playerID: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: ObjectId as any,
        required: false
      },
      type: {
        type: String,
        required: true,
        enum: [...enumToKeys(UserType)]
      }
    });
  }
}