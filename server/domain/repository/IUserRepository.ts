import { IAppUser } from "@domain/entities";

import { IRepository } from "./IRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepository extends IRepository<IAppUser> { }