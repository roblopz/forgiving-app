import { inject, injectable } from "inversify";
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { Mapper } from "@automapper/core";

import { AppResolver } from "@applicationCore/decorators/appResolverDecorator";
import { UserDTO } from "@application/dto/user/userDTO";
import { IoCToken } from "@domain/core/IoCToken";
import { AppUser, Player } from "@infraestructure/models";
import { PlayerDTO } from "@application/dto/player";
import { IAuthService, IPlayerService, IUserService } from "@domain/service";
import { IGraphqlCtx } from "@application/core/graphql/graphqlCtx";
import { AppValidationError } from "@common/validation/errors";

@injectable()
@Resolver(UserDTO)
@AppResolver()
export class UserResolver {
  constructor(
    @inject(IoCToken.UserService) private userService: IUserService,
    @inject(IoCToken.PlayerService) private playerService: IPlayerService,
    @inject(IoCToken.AuthService) private authService: IAuthService,
    @inject(IoCToken.AppMapper) private mapper: Mapper
  ) {}
  
  @Mutation(_returns => UserDTO)
  async login(
    @Ctx() ctx: IGraphqlCtx,
    @Arg("username", _type => String) username: string,
    @Arg("password", _type => String) password: string
  ): Promise<UserDTO> {
    const usr = this.userService.getByUserName(username);
    const invalidError = new AppValidationError('Invalid username/password', {
      username: 'Invalid username/password',
      password: 'Invalid username/password'
    });

    if (!usr) throw invalidError;
    else if (usr.password !== password) throw invalidError;
    else {
      await this.authService.grantAuthorization(ctx.response, usr);
      return this.mapper.map(usr, UserDTO, AppUser);
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