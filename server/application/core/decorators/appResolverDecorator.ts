import { IoCToken } from "@domain/core/IoCToken";
import { AppContainer } from "../IoC/container";

export function AppResolver() : ClassDecorator {
  return function (target) {
    AppContainer.bind(IoCToken.Resolver).toConstantValue(target);
    AppContainer.bind(target).toSelf();
  };
}