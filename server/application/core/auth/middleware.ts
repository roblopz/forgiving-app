import { RequestHandler } from 'express';
import { Container } from 'inversify';
import { AuthChecker } from 'type-graphql';

import { verify } from './index';
import { IUserService } from '@applicationService';
import { IoCToken } from '@domain/core/IoCToken';
import { IGraphqlCtx } from '../graphqlCtx';

export function authExpressMiddleware(appContainer: Container): RequestHandler {
  return async function (req, _res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const authToken = req.headers.authorization.split(' ')[1];
      const [authPayload] = await verify(authToken);
      if (authPayload) {
        const userService = appContainer.get<IUserService>(IoCToken.UserService);
        const user = userService.get(authPayload.userId);
        if (user)
          req.user = user;        
      }
    }

    return next();
  };
}

export const graphqlAuthChecker: AuthChecker<IGraphqlCtx> = ({ context }, roles) => {
  if (!context.user) return false;
  else if (roles && roles.length) {
    if (!roles.includes(context.user.type)) return false;
  }

  return true;
};
