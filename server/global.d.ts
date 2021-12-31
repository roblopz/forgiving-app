
declare namespace Express {
  export interface Request {
     user?: import('@domain/entities/IUser').IUser,
     container: import('inversify').Container
  }
}