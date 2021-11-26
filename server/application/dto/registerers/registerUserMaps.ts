import { AppUser } from "@infraestructure/models";
import { DtoRegisterer } from "@applicationCore/decorators/dtoRegistererDecorator";
import { IDtoRegisterer } from "@domain/core/IDtoRegisterer";
import { Mapper } from '@automapper/core';
import { UserDTO } from '../user/userDTO';

@DtoRegisterer()
export class RegisterUserMaps implements IDtoRegisterer {
  register(mapper: Mapper): void {
    mapper.createMap(AppUser, UserDTO);
  }
}