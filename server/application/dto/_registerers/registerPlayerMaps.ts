import { Player } from '@infraestructure/models';
import { Mapper } from '@automapper/core';
import { DtoRegisterer } from '@application.core/decorators';
import { IDtoRegisterer } from '@application.core/dto';
import { PlayerDTO } from '../player';

@DtoRegisterer()
export class RegisterPlayerMaps implements IDtoRegisterer {
  register(mapper: Mapper): void {
    mapper.createMap(Player, PlayerDTO);
  }
}