import { IsDefined, IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { AutoMap } from '@automapper/classes';

import { ID, IPlayer, PlayerStatus } from "@domain/entities";

export class Player implements IPlayer {
  @AutoMap({ typeFn: () => String })
  @IsDefined()
  id: ID;

  @AutoMap({ typeFn: () => String })
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @AutoMap({ typeFn: () => String })
  @IsDefined()
  status: PlayerStatus;

  @AutoMap({ typeFn: () => Number })
  @IsInt()
  @Min(-100)
  @Max(100)
  hateLevel: number;
}