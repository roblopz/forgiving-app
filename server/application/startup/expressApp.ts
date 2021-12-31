import express from 'express';
import path from 'path';
import { authExpressMiddleware, diExpressMiddleware } from '@application/middleware';
import cookieParser from 'cookie-parser';

export function build() {
  const app = express();
  
  app.use(express.static(path.resolve(__dirname, 'application/assets')));
  app.use(cookieParser());
  app.use(diExpressMiddleware());
  app.use(authExpressMiddleware());

  return app;
}