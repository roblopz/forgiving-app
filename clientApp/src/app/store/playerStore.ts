import { makeAutoObservable } from "mobx";
import { Except } from 'type-fest';

import { PlayerFragment, PlayerStatus } from "@graphql/types";

interface PlayerVMClass extends Except<PlayerFragment, '__typename'> {
  setStatus(status: PlayerStatus): void;
  setHateLevel(level: number): void;
}

export class PlayerVM implements PlayerVMClass {
  constructor(
    public id: string,
    public name: string,
    public hateLevel: number,
    public status: PlayerStatus,
    public imagePath?: string
  ) {
    makeAutoObservable(this);    
  }

  setStatus(status: PlayerStatus) {
    this.status = status;
  }

  setHateLevel(hateLevel: number) {
    this.hateLevel = hateLevel;
  }
}

class PlayerStore {
  public players: PlayerVM[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  setPlayers(players: PlayerFragment[]) {
    this.players = players.map(p => new PlayerVM(p.id, p.name, p.hateLevel, p.status, p.imagePath));
  }
}

export const playerStore = new PlayerStore();