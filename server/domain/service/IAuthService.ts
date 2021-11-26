import { IAppUser } from "@domain/entities";
import { Request, Response } from "express";

export interface IAuthService {
  authorizeRequest(request: Request, throwOnJwtError?: boolean): Promise<IAppUser>;
  grantAuthorization(response: Response, user: IAppUser): Promise<void>;
}