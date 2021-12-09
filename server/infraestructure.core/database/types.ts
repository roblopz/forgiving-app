import { Model } from 'mongoose';

import { IEntity } from '@domain.core/entity';
import { MongooseSchema } from './mongooseSchema';

export type UnpackDoc<TModel> = TModel extends Model<infer TDoc> ?
  TDoc extends IEntity ? TDoc : never
  : never;

export type UnpackQueryHelpers<TModel> = TModel extends Model<infer TDoc> ?
  TModel extends Model<TDoc, infer TQuery> ? TQuery : never
  : never;

export type UnpackInstanceMethods<TModel> = TModel extends Model<infer TDoc> ?
  TModel extends Model<TDoc, infer TQuery> ?
  TModel extends Model<TDoc, TQuery, infer TMethods> ? TMethods
  : never
  : never
  : never;

export type UnpackVirtuals<TModel> = TModel extends Model<infer TDoc> ?
  TModel extends Model<TDoc, infer TQuery> ?
  TModel extends Model<TDoc, TQuery, infer TMethods> ?
  TModel extends Model<TDoc, TQuery, TMethods, infer TVirtuals> ? TVirtuals
  : never
  : never
  : never
  : never;

export type MongooseSchemaFromModel<
  TModel extends Model<IEntity>
> = MongooseSchema<TModel>;

export type ClassFromModel<
  TModel extends Model<IEntity>
> = UnpackDoc<TModel> & UnpackVirtuals<TModel>;