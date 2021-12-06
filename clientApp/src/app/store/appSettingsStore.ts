import { makeAutoObservable } from "mobx";
import { client } from '@graphql/client';
import { Except } from "type-fest";

import { AppSettingsDocument, AppSettingsQuery, ConflictDto } from '@graphql/types';
import { handleError } from "@lib/errors/errorHandling";

export type Conflict = Except<ConflictDto, '__typename'>;

class AppSettingsStore {
  currentConflict: Conflict = null;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    try {
      const { data } = await client.query<AppSettingsQuery>({ query: AppSettingsDocument });
      if (data?.appSettings)
        this.currentConflict = data.appSettings.currentConflict;      
    } catch(err) {
      handleError(err).onAnyError('HANDLE_DEFAULT');
    }
  }
}

export const appSettingsStore = new AppSettingsStore();