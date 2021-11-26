import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';

import { wsLink } from "./links.ts/wsLink";
import { authLink } from "./links.ts/authLink";
import { httpLink } from "./links.ts/httpLink";


const commLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: commLink,
  cache: new InMemoryCache()
});
