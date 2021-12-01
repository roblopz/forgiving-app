import { makeAutoObservable } from "mobx";
import { Except } from 'type-fest';

import { UserFragment } from '@graphql/types';
import { clearCookieAuthToken } from '@lib/util/authUtil';

interface ILoggedUser extends Except<UserFragment, '__typename'> { }

class UserStore {
  private _currentUser: ILoggedUser = null;
  
  get currentUser() {
    return this._currentUser;
  }

  get isLoggedIn() {
    return !!this.currentUser?.id;
  }

  constructor() {
    makeAutoObservable(this);    
  }

  login(user: ILoggedUser) {
    this._currentUser = user;    
  }

  logout() {
    clearCookieAuthToken();
    this._currentUser = null;
  }
}

export const userStore = new UserStore();