import { GlobalContainer } from '../IoC/container';
import { IoCToken } from '../IoC/tokens';

export type AppServiceDefinition = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: never[]) => any;
  token: string | symbol;
};

export function AppService(
  serviceToken: string | symbol,
  bindIf: () => boolean = null
): ClassDecorator {
  return function (target) {
    if (!bindIf || bindIf()) {
      GlobalContainer.bind<AppServiceDefinition>(IoCToken.ServiceDefinition).toConstantValue({
        constructor: target as unknown as AppServiceDefinition['constructor'],
        token: serviceToken
      });
    }
  };
}