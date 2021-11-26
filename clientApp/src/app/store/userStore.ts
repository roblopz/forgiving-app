import { makeAutoObservable } from "mobx";
import { Except } from 'type-fest';

import { UserFragment } from '@graphql/types';

interface ILoggedUser extends Except<UserFragment, '__typename'> { }

class UserStore {
  currentUser: ILoggedUser = null;

  constructor() {
    makeAutoObservable(this);    
  }

  login(user: ILoggedUser) {
    this.currentUser = user;    
  }

  logout() {
    this.currentUser = null;
  }
}

export const userStore = new UserStore();