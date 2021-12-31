import { inject, injectable } from 'inversify';
import { HydratedDocument, Model } from 'mongoose';

import { IRepository } from 'domain.core/repository';
import { IdType, IEntity } from '@domain.core/entity';
import { AppError } from '@common/validation/errors';
import { IUnitOfWork } from '@infraestructure.core/unitOfWork';
import { IoCToken } from '@application.core/IoC/tokens';

@injectable()
export class MongoRepository<T extends IEntity> implements IRepository<T> {
  @inject(IoCToken.UnitOfWork)
  protected unitOfWork: IUnitOfWork;
  protected get session() { return this.unitOfWork.session; }

  constructor(protected model: Model<T>) { }

  async getAll() {
    return await this.model.find().session(this.session);
  }

  async get(id: IdType) {
    return await this.model.findById(id).session(this.session);
  }

  async getMany(ids: IdType[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.model.find({ _id: { $in: ids as any } }, null).session(this.session);
  }

  async create(object: T) {
    if (object._id) {
      // eslint-disable-next-line no-console
      console.warn(`Manually assigning _id ${object._id} field for object`);
    }
    
    const newRecord = new this.model(object, { session: this.session });
    await newRecord.save();
    return newRecord;
  }

  async update(object: T) {
    if (this.isHydrated(object)) {
      return await object.save({ session: this.session });        
    } else {
      throw new AppError('Object is dettached');
    }
  }

  async delete(id: IdType) {
    await this.model.findByIdAndDelete(id).session(this.session);
  }

  private isHydrated(obj: T): obj is HydratedDocument<T> {
    return obj && !!(obj as HydratedDocument<T>).$isEmpty && !!(obj as HydratedDocument<T>).$set;
  }
}