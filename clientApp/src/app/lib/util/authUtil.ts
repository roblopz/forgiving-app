import Cookies from 'js-cookie';
import moment from 'moment';

import { appConfig } from '../appConfig';

export function getCookieAuthToken() {
  return Cookies.get(appConfig.authHeaderName);  
}

export function setCookieAuthToken(token: string) {
  Cookies.set(appConfig.authHeaderName, token, {
    expires: moment().add(appConfig.authExpirationHours, 'hours').toDate()
  });
}

export function clearCookieAuthToken() {
  Cookies.remove(appConfig.authHeaderName);
}