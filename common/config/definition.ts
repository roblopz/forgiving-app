
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
  },
  DB: {
    dbName: string,
    connectionString?: string,
    user?: string
    password?: string
    replicaSet?: {
      enabled: boolean
      setName: string
      instances: string[]
    }
  }
}