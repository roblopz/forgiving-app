import { IAppUser } from "@domain/entities";

export interface IGraphqlCtx {
  user?: IAppUser;
}