import { IoCToken } from '../IoC/tokens';
import { GlobalContainer } from '../IoC/container';

export type AppResolverDefinition = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: never[]) => any;
}

export function AppResolver() : ClassDecorator {
  return function (target) {
    GlobalContainer.bind<AppResolverDefinition>(IoCToken.ResolverDefinition).toConstantValue({
      constructor: target as unknown as AppResolverDefinition['constructor']
    });
  };
}