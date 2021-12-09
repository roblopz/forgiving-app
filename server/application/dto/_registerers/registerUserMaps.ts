import { User } from '@infraestructure/models';
import { UserDTO } from '../user/userDTO';
import { Mapper } from '@automapper/core';
import { IDtoRegisterer } from '@application.core/dto';
import { DtoRegisterer } from '@application.core/decorators';

@DtoRegisterer()
export class RegisterUserMaps implements IDtoRegisterer {
  register(mapper: Mapper): void {
    mapper.createMap(User, UserDTO);
  }
}