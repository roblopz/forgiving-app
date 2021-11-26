import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { UserType } from "@domain/entities";
import { PlayerDTO } from "../player";
import { AutoMap } from "@automapper/classes";

registerEnumType(UserType, { name: 'UserType' });

@ObjectType("User")
export class UserDTO {
  @AutoMap({ typeFn: () => String })
  @Field(_type => ID)
  id: string;

  @Field(_type => String)
  @AutoMap({ typeFn: () => String })
  userName: string;

  @Field(_type => PlayerDTO, { nullable: true })
  player?: PlayerDTO;

  @Field(_type => UserType)
  @AutoMap({ typeFn: () => String })
  type: UserType;

  @AutoMap({ typeFn: () => String })
  playerID?: string;
}