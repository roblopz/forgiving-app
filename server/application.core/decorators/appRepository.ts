import { IoCToken } from '../IoC/tokens';
import { GlobalContainer } from '../IoC/container'

export type AppRepositoryDefinition = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: never[]) => any;
  token: string | symbol;
};

export function AppRepository(
  repositoryToken: string | symbol,
  bindIf: () => boolean = null
): ClassDecorator {
  return function (target) {
    if (!bindIf || bindIf()) {
      GlobalContainer.bind<AppRepositoryDefinition>(IoCToken.RepositoryDefinition).toConstantValue({
        constructor: target as unknown as AppRepositoryDefinition['constructor'],
        token: repositoryToken
      });
    }
  };
}