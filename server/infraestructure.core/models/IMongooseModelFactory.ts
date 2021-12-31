import { Model } from 'mongoose';

import { IEntity } from '@domain.core/entity';
import { MongooseSchemaFromModel } from './types';

export interface IMongooseSchemaFactory<TModel extends Model<IEntity>> {
  modelName: string;
  getSchema(): MongooseSchemaFromModel<TModel>;
}