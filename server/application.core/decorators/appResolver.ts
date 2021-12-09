import { Container, IoCToken } from '../IoC';

export function AppResolver() : ClassDecorator {
  return function (target) {
    Container.bind(IoCToken.Resolver).toConstantValue(target);
    Container.bind(target).toSelf();
  };
}