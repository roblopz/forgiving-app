import { AppContainer } from "../IoC/container";

export function AppResolver() : ClassDecorator {
  return function (target) {
    AppContainer.bind(target).toSelf();
  };
}