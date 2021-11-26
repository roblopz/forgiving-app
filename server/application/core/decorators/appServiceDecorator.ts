import { AppContainer } from "../IoC/container";

export function AppService(
  serviceToken: string | symbol,
  bindIf: () => boolean = null
) : ClassDecorator {
  return function (target) {
    if (!bindIf || bindIf())
      AppContainer.bind(serviceToken).to(target as unknown as new() => unknown);
  };
}