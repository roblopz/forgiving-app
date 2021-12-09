import { RequestHandler } from 'express';
import { Container } from 'inversify';

import { IAuthService } from '@application.core/service';
import { IoCToken } from '@application.core/IoC';

export function authExpressMiddleware(appContainer: Container): RequestHandler {
  return async function (request, _res, next) {
    const authService = appContainer.get<IAuthService>(IoCToken.AuthService);
    request.user = await authService.authorizeRequest(request, false);
    return next();
  };
}