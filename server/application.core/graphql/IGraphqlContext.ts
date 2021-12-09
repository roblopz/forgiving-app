import { Request, Response } from 'express';
import { IUser } from '@domain/entities';

export interface IGraphqlCtx {
  user?: IUser;
  request: Request;
  response: Response;
}