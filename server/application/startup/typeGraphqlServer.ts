import path from 'path';
import { buildSchema, NonEmptyArray, ResolverData } from 'type-graphql';

import { IoCToken } from '@application.core/IoC/tokens';
import { GlobalContainer } from '@application.core/IoC/container';
import { graphqlAuthChecker } from '@application/middleware';
import { IGraphqlCtx } from '@application.core/graphql';
import { AppResolverDefinition } from '@application.core/decorators';

export async function build() {
  const resolvers = GlobalContainer
    .getAll<AppResolverDefinition>(IoCToken.ResolverDefinition)
    .map(r => r.constructor);

  const schema = await buildSchema({
    container: ({ context }: ResolverData<IGraphqlCtx>) => context.request.container,
    // eslint-disable-next-line @typescript-eslint/ban-types
    resolvers: resolvers as unknown as NonEmptyArray<Function>,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    authChecker: graphqlAuthChecker
  });

  return schema;
}