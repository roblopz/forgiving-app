import { Field, ID, ObjectType } from "type-graphql";
import { AutoMap } from '@automapper/classes';
import { IsIn, IsInt, Max, Min } from "class-validator";

import { PlayerStatus } from "@domain/entities";

@ObjectType()
export class PlayerDTO {
  @AutoMap({ typeFn: () => String })
  @Field(_type => ID)
  id: string;

  @AutoMap({ typeFn: () => String })
  @Field(_type => String)
  name: string;

  @AutoMap({ typeFn: () => String })
  @Field(_type => String)
  @IsIn(['PEACE', 'WAR'] as PlayerStatus[])
  status?: PlayerStatus;

  @AutoMap({ typeFn: () => Number })
  @Field(_type => Number)
  @IsInt()
  @Min(-100)
  @Max(100)
  hateLevel: number;
}
