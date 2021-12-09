import { Model } from 'mongoose';

import { IPlayer, PlayerStatus } from '@domain/entities';
import { enumToKeys } from '@common/util/types';
import { IMongooseModelFactory, ClassFromModel, MongooseSchema } from '@infraestructure.core/database';
import { ObjectId } from 'bson';
import { AutoMap } from '@automapper/classes';

export type PlayerModel = Model<IPlayer>;

export class Player implements ClassFromModel<PlayerModel> {
  @AutoMap({ typeFn: () => String })
  _id: ObjectId;

  @AutoMap({ typeFn: () => String })
  name: string;

  @AutoMap({ typeFn: () => String })
  status: PlayerStatus;

  @AutoMap({ typeFn: () => Number })
  hateLevel: number;

  @AutoMap({ typeFn: () => String })
  imagePath?: string;
}

export class PlayerModelBuilder implements IMongooseModelFactory<PlayerModel> {
  getSchema() {
    const schema = new MongooseSchema<PlayerModel>({
      name: {
        type: String,
        required: true,
        minlength: 3
      },
      hateLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        validate: [{
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value'
        }]
      },
      imagePath: {
        type: String,
        required: false
      },
      status: {
        type: String,
        required: true,
        enum: [...enumToKeys(PlayerStatus)]
      }
    });

    return schema;
  }
}