
export type Config = {
  env: 'production' | 'development' | 'staging',
  Server: {
    port: number,
    graphqlPath: string,
    env: string,
    jwtSecret: string
  },
  Client: {
    port: number
  },
  Auth: {
    expHours: number,
    devAuthTokenHeader?: string
  }
}