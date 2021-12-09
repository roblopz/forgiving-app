import { WebSocketLink } from '@apollo/client/link/ws';
import { appConfig } from '@lib/appConfig';

export const wsLink = new WebSocketLink({
  uri: appConfig.graphqlWsUrl,
  options: {
    reconnect: true
  }
});