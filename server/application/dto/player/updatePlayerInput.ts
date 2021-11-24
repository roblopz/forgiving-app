import { Field, ID, InputType } from "type-graphql";
import { IsIn, IsInt, Max, Min } from "class-validator";

import { PlayerStatus } from "@domain/entities";

@InputType()
export class UpdatePlayerInput {
  @Field(_type => ID)
  id: string;
  
  @Field(_type => PlayerStatus)
  @IsIn(['PEACE', 'WAR'] as PlayerStatus[])
  status: PlayerStatus;

  @Field(_type => Number)
  @IsInt()
  @Min(-100)
  @Max(100)
  hateLevel: number;
}
