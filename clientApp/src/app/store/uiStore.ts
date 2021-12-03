
import { makeAutoObservable, runInAction } from "mobx";
import { OptionsObject as SnackbarOptions, SnackbarMessage } from 'notistack';

type EnqueuedSnackbar = {
  key: string;
  message: SnackbarMessage,
  options?: SnackbarOptions 
};

class UIStore {
  _snackbarQueue: EnqueuedSnackbar[] = [];
  _closeSnackbarQueue: string[] = [];

  constructor() {
    makeAutoObservable(this);    
  }

  enqueueSnackbar(message: SnackbarMessage, options: SnackbarOptions = {}) {
    const snackKey = this.newSnackGuid();
    options.key = snackKey;

    runInAction(() => {
      this._snackbarQueue.push({
        key: snackKey,
        message,
        options
      });
    });

    return snackKey;
  }

  closeSnackbar(key: string) {
    this._closeSnackbarQueue.push(key);
  }

  _dequeueSnackbar(key: string) {
    runInAction(() => {
      const itemIdx = this._snackbarQueue.findIndex(i => i.key === key);
      if (itemIdx !== -1)
        this._snackbarQueue.splice(itemIdx, 1);
    });
  }

  _dequeueCloseSnackbar(key: string) {
    runInAction(() => {
      const itemIdx = this._closeSnackbarQueue.findIndex(i => i === key);
      if (itemIdx !== -1)
        this._closeSnackbarQueue.splice(itemIdx, 1);
    });
  }

  private newSnackGuid() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

export const uiStore = new UIStore();