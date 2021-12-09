import { IEntity, IdType } from '../entity';

export interface IRepository<T extends IEntity> {
  getAll(): Promise<T[]>;
  get(id: IdType): Promise<T>;
  getMany(ids: IdType[]) : Promise<T[]>;
  create(object: T): Promise<T>;
  update(object: T): Promise<T>;
  delete(id: IdType): void;
}