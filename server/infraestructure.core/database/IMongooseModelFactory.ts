import { IEntity } from '@domain.core/entity';
import { Model } from 'mongoose';
import { MongooseSchemaFromModel } from './types';

export interface IMongooseModelFactory<TModel extends Model<IEntity>> {
  getSchema(): MongooseSchemaFromModel<TModel>;
}