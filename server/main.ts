/* eslint-disable no-console */
import 'module-alias/register';
import 'reflect-metadata';
import * as bootstrap from './application/bootstrap';

import http from 'http';

import config from '@infraestructure/config';
import { build as buildExpress } from './application/startup/expressApp';
import { build as buildGraphqlServer } from './application/startup/apolloServer';

const appPort = config.getSetting('Server.port');
const graphqlPath = config.getSetting('Server.graphqlPath');

(async () => {
  try {
    await bootstrap.init();
    const app = buildExpress();
    const httpServer = http.createServer(app);
    const graphqlServier = await buildGraphqlServer(httpServer, graphqlPath);

    await graphqlServier.start();
    graphqlServier.applyMiddleware({ app, path: graphqlPath });

    httpServer.listen({ port: appPort }, () => {
      console.log(`🚀 Server ready at http://localhost:${appPort}${graphqlServier.graphqlPath}`);
    });
  } catch (err) {
    console.error(err);
  }
})();