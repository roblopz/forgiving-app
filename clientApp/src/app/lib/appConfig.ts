const config = ((): AppGlobalConfig => {
  if (typeof window === 'undefined') {
    return {
      env: 'development',
      expHours: 0,
      hostUrl: '',
      devAuthTokenHeader: '',
      graphqlPath: '/graphql'
    }
  }

  return window.__APP_CONFIG__;
})();

const graphqlUrl = `${config.hostUrl}${config.graphqlPath}`;

export const appConfig = {
  graphqlUrl,
  graphqlWsUrl: graphqlUrl.replace('http', 'ws'),
  authExpirationHours: config.expHours,
  authHeaderName: config.devAuthTokenHeader,
  hostUrl: config.hostUrl
}