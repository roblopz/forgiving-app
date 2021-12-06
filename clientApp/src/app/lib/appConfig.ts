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

let graphqlUrl = `${config.hostUrl}${config.graphqlPath}`;

if (window.NODE_ENV === 'development') {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile)
    graphqlUrl = 'http://192.168.0.187:4000/graphql';
}

export const appConfig = {
  graphqlUrl,
  graphqlWsUrl: graphqlUrl.replace('http', 'ws'),
  authExpirationHours: config.expHours,
  authHeaderName: config.devAuthTokenHeader,
  hostUrl: config.hostUrl
}