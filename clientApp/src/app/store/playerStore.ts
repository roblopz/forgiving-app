import { makeAutoObservable } from "mobx";
import { Except } from 'type-fest';

import { PlayerFragment, PlayerStatus } from "@graphql/types";
import { userStore } from './userStore';

interface PlayerVMClass extends Except<PlayerFragment, '__typename'> {
  setStatus(status: PlayerStatus): void;
  setHateLevel(level: number): void;
  canEdit: boolean;
}

export enum UndefinedPlayerStatus {
  Undefined = 'UNDEFINED'
}

export type OverallPlayerStatus = PlayerStatus | UndefinedPlayerStatus;

export enum HateLevelEnum {
  DEATH_SENTENCE = 'DEATH_SENTENCE',
  HATE = 'HATE',
  DISSAPOINTMENT = 'DISSAPOINTMENT',
  INDIFERENCE = 'INDIFERENCE',
  AFFECTION = 'AFFECTION',
  LOVE = 'LOVE',
  DEVOTION = 'DEVOTION'
}

export const hateLevelTranslation: { [key in keyof typeof HateLevelEnum]: string } = {
  AFFECTION: 'Afecto',
  DEATH_SENTENCE: 'Sentencia de muerte',
  DEVOTION: 'Devoción',
  DISSAPOINTMENT: 'Decepción',
  HATE: 'Odio',
  INDIFERENCE: 'Indiferencia',
  LOVE: 'Amor'  
};

export function getHateLevelEnum(hateLevel: number): HateLevelEnum {
  hateLevel = Math.floor(hateLevel);
  switch (true) {
    case (hateLevel === 0):
      return HateLevelEnum.DEVOTION;
    case (hateLevel >= 1 && hateLevel <= 25):
      return HateLevelEnum.LOVE;
    case (hateLevel >= 26 && hateLevel <= 44):
      return HateLevelEnum.AFFECTION;
    case (hateLevel >= 45 && hateLevel <= 55):
      return HateLevelEnum.INDIFERENCE;
    case (hateLevel >= 56 && hateLevel <= 75):
      return HateLevelEnum.DISSAPOINTMENT;
    case (hateLevel >= 76 && hateLevel <= 99):
      return HateLevelEnum.HATE;
    default:
      return HateLevelEnum.DEATH_SENTENCE;
  }
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

  get canEdit() {
    return userStore.isLoggedIn && userStore.currentUser?.player?.id === this.id;
  }

  get hateLevelEnum() {
    return getHateLevelEnum(this.hateLevel);
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

  get averageHate() {
    if (!this.players.length)
      return 50;

    return (this.players.reduce((acc, curr) => {
      return acc + curr.hateLevel;
    }, 0)) / this.players.length;
  }

  get overallStatus(): OverallPlayerStatus {
    if (!this.players.length) return UndefinedPlayerStatus.Undefined;
    else {
      const baseStatus = this.players[0].status;
      const isUndefined = this.players.some(p => p.status !== baseStatus);
      return isUndefined ? UndefinedPlayerStatus.Undefined : baseStatus;
    }
  }
}

export const playerStore = new PlayerStore();