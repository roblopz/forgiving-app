import { AppContainer } from "../IoC/container";

export function AppService(serviceToken: string | symbol) : ClassDecorator {
  return function (target) {
    AppContainer.bind(serviceToken).to(target as unknown as new() => unknown);
  };
}