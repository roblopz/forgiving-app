
export type Config = {
  env: 'production' | 'development' | 'staging',
  Server: {
    port: number,
    graphqlPath: string,
    env: string
  },
  Client: {
    port: number
  }
}