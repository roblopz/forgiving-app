import { RequestHandler } from 'express';

import { IAuthService } from '@application.core/service';
import { IoCToken } from '@application.core/IoC/tokens';

export function authExpressMiddleware(): RequestHandler {
  return async function (request, _res, next) {
    const authService = request.container.get<IAuthService>(IoCToken.AuthService);
    request.user = await authService.authorizeRequest(request, false);
    return next();
  };
}