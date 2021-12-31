import { Connection } from 'mongoose';

export enum ConnectionState {
  DISCONNECTED = 0,
  CONNECTED = 1,
  CONNECTING = 2,
  DISCONNECTING = 3
}

export interface IAppDB {
  get connection(): Connection;
  get state(): ConnectionState;
}