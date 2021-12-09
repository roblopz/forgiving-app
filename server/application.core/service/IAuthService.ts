import { IUser } from '@domain/entities';
import { Request, Response } from 'express';

export interface IAuthService {
  authorizeRequest(request: Request, throwOnJwtError?: boolean): Promise<IUser>;
  grantAuthorization(response: Response, user: IUser): Promise<void>;
}