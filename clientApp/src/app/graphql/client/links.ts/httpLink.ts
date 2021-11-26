import { HttpLink } from "@apollo/client";
import { appConfig } from "@lib/appConfig";

export const httpLink = new HttpLink({
  uri: appConfig.graphqlUrl
});