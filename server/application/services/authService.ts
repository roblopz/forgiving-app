import { Request, Response } from 'express';
import { injectable } from 'inversify';

import settings from '@infraestructure/config';
import { IoCToken } from '@application.core/IoC';
import { AppService } from '@application.core/decorators';
import { IAuthService } from '@application.core/service';
import { IUser } from '@domain/entities';

@injectable()
@AppService(IoCToken.AuthService, () => settings.getSetting('env') === "production")
export class AuthService implements IAuthService {
  authorizeRequest(_request: Request, _throwOnJwtError = true): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  grantAuthorization(_response: Response, _user: IUser): Promise<void> {
    throw new Error("Method not implemented.");
  }
}