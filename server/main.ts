/* eslint-disable no-console */
import 'module-alias/register';
import 'reflect-metadata';
import './application/core/bootstrap';

import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, PluginDefinition } from 'apollo-server-core';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import config from '@infraestructure/config';
import { AppContainer } from '@applicationCore/IoC/container';
import { IGraphqlCtx } from '@application/core/graphql/graphqlCtx';
import { IoCToken } from '@domain/core/IoCToken';
import { authExpressMiddleware, graphqlAuthChecker } from '@application/middleware';
import { errorFormatter } from '@application/core/graphql/formatError';

function ApolloSubscriptionServerStartPlugin(subscriptionServer: SubscriptionServer): PluginDefinition {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        }
      };
    }
  };
}

const appPort = config.getSetting('Server.port');
const graphqlPath = config.getSetting('Server.graphqlPath');

(async () => {
  try {
    const app = express();
    const httpServer = http.createServer(app);    

    const schema = await buildSchema({
      // eslint-disable-next-line @typescript-eslint/ban-types
      resolvers: AppContainer.getAll(IoCToken.Resolver) as NonEmptyArray<Function>,
      container: AppContainer,
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      authChecker: graphqlAuthChecker
    });    

    const subscriptionServer = SubscriptionServer.create(
      {
        schema, 
        execute, 
        subscribe
      }, 
      { server: httpServer, 
        path: graphqlPath 
      }
    );

    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloSubscriptionServerStartPlugin(subscriptionServer)
      ],
      context: ({ req, res }) => {
        const ctx: IGraphqlCtx = { user: req.user, request: req, response: res };
        return ctx;
      },
      formatError: errorFormatter
    });

    app.use(cookieParser());
    app.use(authExpressMiddleware(AppContainer));
    app.use(express.static(path.resolve(__dirname, 'application/public')));

    await server.start();
    server.applyMiddleware({ app, path: graphqlPath });

    httpServer.listen({ port: appPort }, () => {
      console.log(`🚀 Server ready at http://localhost:${appPort}${server.graphqlPath}`);
    });    
  } catch (err) {
    console.error(err);
  }
})();