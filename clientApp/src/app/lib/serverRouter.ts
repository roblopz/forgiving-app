import { appConfig } from './appConfig';

export function buildRoute(subpath: string) {
  if (!subpath.startsWith('/')) subpath += '/';
  return appConfig.hostUrl + subpath;
}