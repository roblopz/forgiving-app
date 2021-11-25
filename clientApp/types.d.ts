export {};

declare global {
  interface Window {
    __HOST_URL__: string,
    NODE_ENV: 'development' | 'production' | 'staging'
  }
}