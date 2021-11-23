/* eslint-disable no-console */
import 'module-alias/register';
import 'reflect-metadata';
import './application/core/bootstrap';

import express from 'express';
import http from 'http';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { PlayerResolver } from '@application/resolvers';
import { AppContainer } from '@application/core/IoC/container';

(async () => {
  try {
    const schema = await buildSchema({
      resolvers: [PlayerResolver],
      container: AppContainer,
      emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    });
    
    const app = express();
    const httpServer = http.createServer(app);
  
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app });

    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  } catch (err) {
    console.error(err);
  }  
})();