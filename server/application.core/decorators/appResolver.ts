import { GlobalContainer } from '@application.core/IoC/_global';
import { IoCToken } from '../IoC/tokens';

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