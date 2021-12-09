import { inject, injectable } from 'inversify';
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import { Mapper } from '@automapper/core';

import { AppResolver } from '@application.core/decorators';
import { UserDTO } from '@application/dto/user/userDTO';
import { PlayerDTO } from '@application/dto/player';
import { IAuthService } from '@application.core/service';
import { IoCToken } from '@application.core/IoC';
import { IGraphqlCtx } from '@application.core/graphql';
import { AppValidationError } from '@common/validation/errors';
import { IPlayerRepository, IUserRepository } from '@domain/repositories';
import { Player, User } from '@infraestructure/models';

@injectable()
@Resolver(UserDTO)
@AppResolver()
export class UserResolver {
  constructor(
    @inject(IoCToken.UserRepository) private userRepo: IUserRepository,
    @inject(IoCToken.PlayerRepository) private playerRepo: IPlayerRepository,
    @inject(IoCToken.AuthService) private authService: IAuthService,
    @inject(IoCToken.AppMapper) private mapper: Mapper
  ) {}
  
  @Mutation(_returns => UserDTO)
  async login(
    @Ctx() ctx: IGraphqlCtx,
    @Arg("username", _type => String) username: string,
    @Arg("password", _type => String) password: string
  ): Promise<UserDTO> {
    const usr = await this.userRepo.getByUsername(username);
    const invalidError = new AppValidationError('Invalid username/password', {
      username: 'Invalid username/password',
      password: 'Invalid username/password'
    });

    if (!usr) throw invalidError;
    else if (usr.password !== password) throw invalidError;
    else {
      await this.authService.grantAuthorization(ctx.response, usr);
      return this.mapper.map(usr, UserDTO, User);
    }
  }

  @FieldResolver(_returns => PlayerDTO)
  async player(@Root() user: UserDTO): Promise<PlayerDTO> {
    if (user?.playerID) {
      const player = await this.playerRepo.get(user.playerID);
      return this.mapper.map(player, PlayerDTO, Player);
    }
  }
}