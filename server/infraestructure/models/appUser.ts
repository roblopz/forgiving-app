import { IsDefined, IsIn, IsNotEmpty, MinLength } from "class-validator";

import { IAppUser, ID, UserType } from "@domain/entities";
import { AutoMap } from "@automapper/classes";

export class AppUser implements IAppUser {
  @AutoMap({ typeFn: () => String })
  @IsDefined()
  id: ID;
  
  @AutoMap({ typeFn: () => String })
  @IsDefined()
  @IsNotEmpty()
  @MinLength(4)
  userName: string;
  
  @IsDefined()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
  
  @AutoMap({ typeFn: () => String })
  playerID?: ID;
  
  @AutoMap({ typeFn: () => String })
  @IsDefined()
  @IsIn([UserType.ANON, UserType.PLAYER] as UserType[])
  type: UserType;
}