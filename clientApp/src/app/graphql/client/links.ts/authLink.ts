import { ApolloLink } from "@apollo/client";

import { appConfig } from "@lib/appConfig";
import { getCookieAuthToken, setCookieAuthToken } from "@lib/util/authUtil";

function isHeaders(headers: unknown): headers is Headers {
  return !!headers;
}
export const authLink = new ApolloLink((operation, forward) => {
  const cookieAuthToken = getCookieAuthToken();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: cookieAuthToken ? `Bearer ${cookieAuthToken}` : null
    }
  }));

  return forward(operation).map((response) => {
    const ctx = operation.getContext();
    const respHeaders = ctx?.response?.headers as unknown;

    if (isHeaders(respHeaders)) {
      const authToken = respHeaders.get(appConfig.authHeaderName);
      if (authToken) {
        setCookieAuthToken(authToken);
      }
    }

    return response;
  });
});