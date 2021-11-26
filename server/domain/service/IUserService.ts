import { ID } from "@domain/entities";
import { AppUser } from "@infraestructure/models";

export interface IUserService {
  get(id: ID): AppUser;
  getByUserName(username: string): AppUser;
}