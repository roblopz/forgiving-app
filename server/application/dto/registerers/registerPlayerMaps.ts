import { PlayerDTO } from '@applicationDto/player';
import { Player } from "@infraestructure/models";
import { DtoRegisterer } from "@application/core/decorators/dtoRegisterer";
import { IDtoRegisterer } from "@domain/core/IDtoRegisterer";
import { Mapper } from '@automapper/core';

@DtoRegisterer()
export class RegisterPlayerMaps implements IDtoRegisterer {
  register(mapper: Mapper): void {
    mapper.createMap(Player, PlayerDTO);
  }
}