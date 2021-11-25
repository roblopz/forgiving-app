import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { AutoMap } from '@automapper/classes';

import { PlayerStatus } from "@domain/entities";

registerEnumType(PlayerStatus, { name: 'PlayerStatus' });

@ObjectType('Player')
export class PlayerDTO {
  @AutoMap({ typeFn: () => String })
  @Field(_type => ID)
  id: string;

  @AutoMap({ typeFn: () => String })
  @Field(_type => String)
  name: string;

  @AutoMap({ typeFn: () => String })
  @Field(_type => PlayerStatus)
  status: PlayerStatus;

  @AutoMap({ typeFn: () => Number })
  @Field(_type => Number)
  hateLevel: number;

  @AutoMap({ typeFn: () => String })
  @Field(_type => String, { nullable: true })
  imagePath?: string;
}