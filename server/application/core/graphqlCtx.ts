import { IAppUser } from "@domain/entities";
import { Request, Response } from "express";

export interface IGraphqlCtx {
  user?: IAppUser;
  request: Request;
  response: Response;
}