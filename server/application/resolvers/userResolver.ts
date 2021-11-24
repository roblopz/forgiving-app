import { inject, injectable } from "inversify";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { Mapper } from "@automapper/core";

import { AppResolver } from "@application/core/decorators/appResolverDecorator";
import { UserDTO } from "@application/dto/user/userDTO";
import { IoCToken } from "@domain/core/IoCToken";
import { IPlayerService, IUserService } from "@applicationService";
import { AppUser, Player } from "@infraestructure/models";
import { PlayerDTO } from "@application/dto/player";
import { UserAuthResponse } from "@application/dto/user/userAuthResponse";
import { getAuthToken } from "@application/core/auth";

@injectable()
@Resolver(UserDTO)
@AppResolver()
export class UserResolver {
  constructor(
    @inject(IoCToken.UserService) private userService: IUserService,
    @inject(IoCToken.PlayerService) private playerService: IPlayerService,
    @inject(IoCToken.AppMapper) private mapper: Mapper
  ) {}
  
  @Mutation(_returns => UserAuthResponse)
  async login(
    @Arg("username", _type => String) username: string,
    @Arg("password", _type => String) password: string
  ): Promise<UserAuthResponse> {
    const usr = this.userService.getByUserName(username);
    if (!usr) throw new Error('Invalid');
    else if (usr.password !== password) throw new Error('Invalid');
    else {
      const res = new UserAuthResponse();
      res.authToken = await getAuthToken(usr);
      res.user = this.mapper.map(usr, UserDTO, AppUser);
      return res;
    }
  }

  @FieldResolver(_returns => PlayerDTO)
  player(@Root() user: UserDTO): PlayerDTO {
    if (user?.playerID) {
      const player = this.playerService.getPlayer(user.playerID);
      return this.mapper.map(player, PlayerDTO, Player);
    }
  }
}