
export function buildRoute(subpath: string) {
  if (!subpath.startsWith('/')) subpath += '/';
  return window.__HOST_URL__ + subpath;
}