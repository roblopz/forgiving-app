import { RequestHandler } from "express";
import { Container } from "inversify";

import { IAuthService } from "@domain/service";
import { IoCToken } from "@domain/core/IoCToken";

export function authExpressMiddleware(appContainer: Container): RequestHandler {
  return async function (request, _res, next) {
    const authService = appContainer.get<IAuthService>(IoCToken.AuthService);
    request.user = await authService.authorizeRequest(request);
    return next();
  };
}