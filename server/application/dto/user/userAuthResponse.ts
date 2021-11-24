import { Field, ObjectType } from "type-graphql";
import { UserDTO } from "./userDTO";

@ObjectType()
export class UserAuthResponse {
  @Field(_type => UserDTO)
  user: UserDTO;

  @Field(_type => String)
  authToken: string;
}