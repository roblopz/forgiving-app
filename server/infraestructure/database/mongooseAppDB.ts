import { injectable, preDestroy } from 'inversify';
import { Connection, createConnection } from 'mongoose';

import { ConnectionState, IAppDB } from '@infraestructure.core/database/IAppDB';
import config, { Config } from '@infraestructure/config';

@injectable()
export class MongooseAppDB implements IAppDB {
  private _connection: Connection;

  public get connection(): Connection {
    return this._connection;
  }

  public get state(): ConnectionState {
    switch (this._connection?.readyState) {
      case 1: return ConnectionState.CONNECTED;
      case 2: return ConnectionState.CONNECTING;
      case 3: return ConnectionState.DISCONNECTING;
      default: return ConnectionState.DISCONNECTED;
    }
  }

  constructor() {
    const dbSettings = config.getSetting('DB');
    
    const connString = dbSettings.replicaSet?.enabled ? 
      this.getReplicasetConnectionString(dbSettings) : 
      this.getStandaloneConnectionString(dbSettings);

    this._connection = createConnection(connString);
  }

  private getStandaloneConnectionString(dbSettings: Config['DB']) {
    let connectionString = `${dbSettings.connectionString}/${dbSettings.dbName}`;
    
    if (dbSettings.user)
      connectionString = connectionString.replace('mongodb://', `mongodb://${dbSettings.user}:${dbSettings.password}@`);
    
    return connectionString;
  }

  private getReplicasetConnectionString(dbSettings: Config['DB']) {
    let connectionString = dbSettings.replicaSet.instances.map((v, i) => {
      return i === 0 ? v : v.replace('mongodb://', '');
    }).join(',');
    
    if (dbSettings.user)
      connectionString = connectionString.replace(/mongodb:\/\//, `mongodb://${dbSettings.user}:${dbSettings.password}@`);

    connectionString += `/${dbSettings.dbName}?replicaSet=${dbSettings.replicaSet.setName}`;
    return connectionString;
  }

  @preDestroy()
  disconnect() {
    if (this._connection)
      this._connection.close(false).then(() => this._connection = null);
  }
}