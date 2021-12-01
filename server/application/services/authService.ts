import { Request, Response } from "express";
import { injectable } from "inversify";

import settings from '@infraestructure/config';
import { IoCToken } from "@domain/core/IoCToken";
import { IAppUser } from "@domain/entities";
import { IAuthService } from "@domain/service";
import { AppService } from "@applicationCore/decorators/appServiceDecorator";

@injectable()
@AppService(IoCToken.AuthService, () => settings.getSetting('env') === "production")
export class AuthService implements IAuthService {
  authorizeRequest(_request: Request, _throwOnJwtError = true): Promise<IAppUser> {
    throw new Error("Method not implemented.");
  }

  grantAuthorization(_response: Response, _user: IAppUser): Promise<void> {
    throw new Error("Method not implemented.");
  }
}