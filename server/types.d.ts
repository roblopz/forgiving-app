
declare namespace Express {
  export interface Request {
     user?: import('@domain/entities/IAppUser').IAppUser
  }
}