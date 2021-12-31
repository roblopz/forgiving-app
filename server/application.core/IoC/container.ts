import { Container as InversifyContainer } from 'inversify';
import { IoCToken } from './tokens';
import { appMapper } from '../dto';
import { AppResolverDefinition, AppServiceDefinition } from '@application.core/decorators';
import { AppRepositoryDefinition } from '@application.core/decorators/appRepository';
import { IAppDB } from '@infraestructure.core/database/IAppDB';
import { MongooseAppDB } from '@infraestructure/database/mongooseAppDB';
import { AppModelDefinition } from '@application.core/decorators/appModel';
import { Seeder } from '@infraestructure/seed/seeder';
import { IUnitOfWork } from '@infraestructure.core/unitOfWork';
import { UnitOfWork } from '@infraestructure/unitOfWork';

const GlobalContainer = new InversifyContainer();

GlobalContainer.bind(IoCToken.AppMapper).toConstantValue(appMapper);
GlobalContainer.bind(IoCToken.AppSeeder).to(Seeder).inTransientScope();
GlobalContainer.bind(IoCToken.Container).toConstantValue(GlobalContainer);

function createContainer() {
  const childContainer = GlobalContainer.createChild();

  // Bind service implementations
  GlobalContainer.getAll<AppServiceDefinition>(IoCToken.ServiceDefinition).forEach(service => {
    childContainer.bind(service.token).to(service.constructor).inTransientScope();
  });

  // Bind resolvers
  GlobalContainer.getAll<AppResolverDefinition>(IoCToken.ResolverDefinition).forEach(resolver => {
    childContainer.bind(resolver.constructor).to(resolver.constructor).inTransientScope();
  });

  // Bind repositories
  GlobalContainer.getAll<AppRepositoryDefinition>(IoCToken.RepositoryDefinition).forEach(repo => {
    childContainer.bind(repo.token).to(repo.constructor).inTransientScope();
  });

  // Bind dbConnection provider
  childContainer.bind<IAppDB>(IoCToken.AppDB).to(MongooseAppDB).inSingletonScope();

  // Bind models
  GlobalContainer.getAll<AppModelDefinition>(IoCToken.ModelDefinition).forEach(modelDef => {
    childContainer.bind(modelDef.token).toDynamicValue((ctx) => {
      const dbConn = ctx.container.get<MongooseAppDB>(IoCToken.AppDB);
      const schemaFactory = new modelDef.constructor();
      return dbConn.connection.model(schemaFactory.modelName, schemaFactory.getSchema());
    }).inSingletonScope();
  });

  childContainer.bind<IUnitOfWork>(IoCToken.UnitOfWork).to(UnitOfWork).inRequestScope();

  childContainer.bind(IoCToken.Container).toConstantValue(childContainer);

  return childContainer;
}

export {
  GlobalContainer,
  createContainer as createChildContainer
};