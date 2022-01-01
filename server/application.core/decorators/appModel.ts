import { GlobalContainer } from '@application.core/IoC/_global';
import { IMongooseSchemaFactory } from '@infraestructure.core/models';
import { IoCToken } from '../IoC/tokens';

export type AppModelDefinition = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: never[]) => IMongooseSchemaFactory<any>;
  token: string | symbol;
};

export function AppModel(modelToken: string | symbol): ClassDecorator {
  return function (target) {
    GlobalContainer.bind<AppModelDefinition>(IoCToken.ModelDefinition).toConstantValue({
      constructor: target as unknown as AppModelDefinition['constructor'],
      token: modelToken
    });
  };
}