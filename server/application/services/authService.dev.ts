import { injectable } from "inversify";
import { Request, Response } from "express";

import settings from '@infraestructure/config';
import { IAppUser } from "@domain/entities";
import { IAuthService } from "@domain/service";
import { AppService } from "@application/core/decorators/appServiceDecorator";
import { IoCToken } from "@domain/core/IoCToken";
import { verify, getAuthToken } from "@application/core/auth";
import { AppAuthError, AppError } from "@common/validation/errors";

@injectable()
@AppService(IoCToken.AuthService, () => settings.getSetting('env') !== "production")
export class DevAuthService implements IAuthService {
  private jwtSecret = settings.getSetting('Server.jwtSecret');
  get authExpirationSeconds() {
    const expHours = settings.getSetting('Auth.expHours');
    return expHours * 3600;
  }

  async authorizeRequest(request: Request, throwOnJwtError = true): Promise<IAppUser> {        
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
      const authToken = request.headers.authorization.split(' ')[1];      
      if (authToken?.length) {
        const [authPayload, err] = await verify<IAppUser>(authToken, this.jwtSecret);
        if (authPayload) {
          return authPayload;
        } else if (throwOnJwtError) {
          throw new AppAuthError(err?.message || 'No auth', null, false, err || new Error('Could not verify auth token'));
        }
      }
    }
  }

  async grantAuthorization(response: Response, user: IAppUser): Promise<void> {
    if (!user) 
      throw new AppError('User argument not provided');

    const authToken = await getAuthToken(user, this.jwtSecret, {
      expiresIn: this.authExpirationSeconds
    });

    response.setHeader('Access-Control-Expose-Headers', settings.getSetting('Auth.devAuthTokenHeader'));
    response.setHeader(settings.getSetting('Auth.devAuthTokenHeader'), authToken);
  }
}