import { injectable } from 'inversify';
import { HydratedDocument, Model } from 'mongoose';

import { IRepository } from 'domain.core/repository';
import { IdType, IEntity } from '@domain.core/entity';
import { AppError } from '@common/validation/errors';

@injectable()
export class MongoRepository<T extends IEntity> implements IRepository<T> {
  constructor(private model: Model<T>) { }

  async getAll() {
    return await this.model.find();
  }

  async get(id: IdType) {
    return await this.model.findById(id);
  }

  async getMany(ids: IdType[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.model.find({ _id: { $in: ids as any } });
  }

  async create(object: T) {
    if (object._id) {
      // eslint-disable-next-line no-console
      console.warn(`Manually assigning _id ${object._id} field for object`);
    }
    
    const newRecord = new this.model(object);
    await newRecord.save();
    return newRecord;
  }

  async update(object: T) {
    if (this.isHydrated(object)) {
      return await object.save();        
    } else {
      throw new AppError('Object is dettached');
    }
  }

  async delete(id: IdType) {
    await this.model.findByIdAndDelete(id);
  }

  private isHydrated(obj: T): obj is HydratedDocument<T> {
    return obj && !!(obj as HydratedDocument<T>).$isEmpty && !!(obj as HydratedDocument<T>).$set;
  }
}