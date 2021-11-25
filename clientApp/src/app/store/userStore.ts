import { makeAutoObservable } from "mobx";
import { Except } from 'type-fest';

import { LoginMutation } from '@graphql/types';

type LoginUserResp = LoginMutation['user']['user'];

interface ILoggedUser extends Except<LoginUserResp, '__typename'> { }

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