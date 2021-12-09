import { Container } from '../IoC';

export function AppService(
  serviceToken: string | symbol,
  bindIf: () => boolean = null
) : ClassDecorator {
  return function (target) {
    if (!bindIf || bindIf())
      Container.bind(serviceToken).to(target as unknown as new() => unknown);
  };
}