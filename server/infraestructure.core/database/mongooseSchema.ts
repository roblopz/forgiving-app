/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  Document, 
  ExtractQueryHelpers, 
  HydratedDocument, 
  Model, 
  Schema, 
  SchemaDefinition, 
  SchemaDefinitionType, 
  SchemaOptions, 
  VirtualType, 
  VirtualTypeOptions 
} from 'mongoose';

import { IEntity, IdType } from '@domain.core/entity';
import { UnpackDoc, UnpackInstanceMethods, UnpackVirtuals } from './types';

interface ITypedVirtualType<T, TDoc extends IEntity, TQueryHelpers> extends VirtualType {
  applyGetters(value: T, doc: Document<IdType, TQueryHelpers, TDoc>): any;
  applySetters(value: T, doc: Document<IdType, TQueryHelpers, TDoc>): any;
  get(fn: (this: Document<IdType, TQueryHelpers, TDoc> & TDoc) => T): this;
  set(fn: (this: Document<IdType, TQueryHelpers, TDoc> & TDoc, value: T) => void): this;
}

type SchemaSetMethodFn<K extends keyof TMethods, TDoc, TMethods, TVirtuals> = TMethods[K] extends (...args: any) => any ? (
  this: HydratedDocument<TDoc, TMethods, TVirtuals>, 
  ...args: TMethods[K] extends (...args: any) => any ? Parameters<TMethods[K]> : never
) => ReturnType<TMethods[K]> : never;


export class MongooseSchema<TModel extends Model<IEntity>> 
  extends Schema<UnpackDoc<TModel>, TModel, UnpackInstanceMethods<TModel>> {
  constructor(definitions: SchemaDefinition<SchemaDefinitionType<UnpackDoc<TModel>>>, options?: SchemaOptions) {
    super(definitions, options);
  }

  public setMethod<K extends keyof UnpackInstanceMethods<TModel>>(
    name: K, 
    fn: SchemaSetMethodFn<K, UnpackDoc<TModel>, UnpackInstanceMethods<TModel>, UnpackVirtuals<TModel>>
  ): this {
    return this.method(name as string, fn as any);    
  }

  public setVirtual<K extends keyof UnpackVirtuals<TModel>>(
    name: K,
    opts?: VirtualTypeOptions
  ): ITypedVirtualType<UnpackVirtuals<TModel>[K], UnpackDoc<TModel>, ExtractQueryHelpers<TModel>> {
    return this.virtual(name as string, opts);
  }
}