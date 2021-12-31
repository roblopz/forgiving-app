import { createChildContainer } from '@application.core/IoC/container';
import { RequestHandler } from 'express';

export function diExpressMiddleware(): RequestHandler {
  return function (request, _res, next) {
    request.container = createChildContainer();
    return next();
  };
}