import { ID } from "@domain/entities";

export interface IRepository<T> {
  getAll(): T[];
  get(id: ID): T;
  getMany(ids: ID[]) : T[];
  create(object: T): T;
  update(object: T): T;
  delete(id: ID): void;
}