import uuid from 'uuid';
import { injectable } from 'inversify';

import { IRepository } from '@domain/repository/IRepository';
import { AppDataContext } from '@infraestructure/appDatacontext';
import { ID, IEntity } from '@domain/entities';

export function RepositoryFactory<TEntity extends IEntity>(type: new() => TEntity) {
  @injectable()
  class Repository implements IRepository<TEntity> {
    set: TEntity[];

    constructor(ctx: AppDataContext) {
      this.set = ctx.getSet(type);
    }

    getAll() {
      return this.cloneList(this.set);
    }
  
    get(id: ID): TEntity {
      return this.cloneObject(this.set.find(p => p.id === id));
    }
    
    getMany(ids: ID[]): TEntity[] {
      return this.cloneList(this.set.filter(p => ids.includes(p.id)));
    }
  
    create(object: TEntity): TEntity {    
      object.id = uuid.v4();
      this.set.push(object);
      return this.cloneObject(object);
    }
  
    update(object: TEntity): TEntity {      
      const targetIdx = this.set.findIndex(x => x.id == object.id)
      if (targetIdx === -1)
        throw new Error('Object not found');

      this.set.splice(targetIdx, 1, object);
      return this.cloneObject(object);
    }
  
    delete(id: ID): void {
      const targetIdx = this.set.findIndex(x => x.id == id)
      if (targetIdx === -1)
        throw new Error('Object not found');

      this.set.splice(targetIdx, 1);
    }

    private cloneObject(obj: TEntity): TEntity {
      return obj ? { ...obj } : null;
    }

    private cloneList(list: TEntity[]): TEntity[] {
      return list.map(i => this.cloneObject(i));
    }
  }

  return Repository;
}