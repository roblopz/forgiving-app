
export {};

type Config = import('../server/infraestructure/config/index').Config;

declare global {
  type AppGlobalConfig = Pick<Config, 'env'> & 
    Config['Auth'] &
    Pick<Config['Server'], 'graphqlPath'> & {
    hostUrl: string;
  };

  interface Window {
    NODE_ENV: 'development' | 'production' | 'staging',
    __APP_CONFIG__: AppGlobalConfig
  }
}