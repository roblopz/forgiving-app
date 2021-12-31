import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, PluginDefinition } from 'apollo-server-core';
import { GraphQLRequestContextWillSendResponse } from 'apollo-server-types';
import { } from 'apollo-server-core';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { Server } from 'http';

import { build as buildTypeGraphql } from './typeGraphqlServer';
import { graphqlErrorFormatter } from '@application/middleware';
import { IGraphqlCtx } from '@application.core/graphql';

function ApolloSubscriptionServerStartPlugin(
  subscriptionServer: SubscriptionServer
): PluginDefinition {
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

function ApolloDisposePlugin(): PluginDefinition {
  return {
    async requestDidStart() {
      return {
        async willSendResponse({ context }: GraphQLRequestContextWillSendResponse<IGraphqlCtx>) {
          if (context.request?.container) {
            const container = context.request.container;
            container?.unbindAll();
          }
        }
      }
    }
  };
}

export async function build(httpServer: Server, graphqlPath: string) {
  const schema = await buildTypeGraphql();

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
      ApolloSubscriptionServerStartPlugin(subscriptionServer),
      ApolloDisposePlugin()
    ],
    context: ({ req, res }) => {
      const ctx: IGraphqlCtx = {
        user: req.user, 
        request: req, 
        response: res 
      };
      
      return ctx;
    },
    formatError: graphqlErrorFormatter
  });

  return server;
}