import { Model } from 'mongoose';

import { IPlayer, PlayerStatus } from '@domain/entities';
import { enumToKeys } from '@common/util/types';
import { IMongooseSchemaFactory, ClassFromModel, MongooseSchema } from '@infraestructure.core/models';
import { ObjectId } from 'bson';
import { AutoMap } from '@automapper/classes';
import { AppModel } from '@application.core/decorators/appModel';
import { IoCToken } from '@application.core/IoC/tokens';

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

@AppModel(IoCToken.PlayerModel)
export class PlayerModelBuilder implements IMongooseSchemaFactory<PlayerModel> {  
  modelName = 'Player';

  getSchema() {
    return new MongooseSchema<PlayerModel>({
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
  }
}