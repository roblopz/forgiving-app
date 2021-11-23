import { ID, PlayerStatus } from "@domain/entities";
import { Player } from "@infraestructure/models";

export interface IPlayerData {
  status: PlayerStatus;
  hateLevel: number;
}

export interface IPlayerService {
  getPlayer(id: ID): Player;
  getAllPlayers(): Player[];
  updatePlayerData(id: ID, playerData: IPlayerData): Player;
}