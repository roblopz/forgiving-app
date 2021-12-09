/* eslint-disable no-console */
import 'module-alias/register';
import 'reflect-metadata';
import './application/bootstrap';

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
import { authExpressMiddleware, graphqlAuthChecker, graphqlErrorFormatter } from '@application/middleware';
import { Container, IoCToken } from '@application.core/IoC';
import { IGraphqlCtx } from '@application.core/graphql';

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
      container: Container,
      // eslint-disable-next-line @typescript-eslint/ban-types
      resolvers: Container.getAll(IoCToken.Resolver) as NonEmptyArray<Function>,
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
      formatError: graphqlErrorFormatter
    });

    app.use(cookieParser());
    app.use(authExpressMiddleware(Container));
    app.use(express.static(path.resolve(__dirname, 'application/assets')));

    await server.start();
    server.applyMiddleware({ app, path: graphqlPath });

    httpServer.listen({ port: appPort }, () => {
      console.log(`🚀 Server ready at http://localhost:${appPort}${server.graphqlPath}`);
    });    
  } catch (err) {
    console.error(err);
  }
})();