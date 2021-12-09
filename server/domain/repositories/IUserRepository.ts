import { IRepository } from '@domain.core/repository/IRepository';
import { IUser } from '@domain/entities';

export interface IUserRepository extends IRepository<IUser> {
  getByUsername(username: string): Promise<IUser>;
}