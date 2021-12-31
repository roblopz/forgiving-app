
const serviceTokens = {
  AuthService: Symbol.for('AuthService')
};

const modelTokens = {
  PlayerModel: Symbol.for('PlayerModel'),
  UserModel: Symbol.for('UserModel')
};

const repositoryTokens = {
  PlayerRepository: Symbol.for('PlayerRepository'),
  UserRepository: Symbol.for('UserRepository')
};

const core = {
  AppMapper: Symbol.for('Mapper'),
  AppDB: Symbol.for('AppDB'),
  ServiceDefinition: Symbol.for('ServiceDefinition'),
  ResolverDefinition: Symbol.for('ResolverDefinition'),
  RepositoryDefinition: Symbol.for('RepositoryDefinition'),
  ModelDefinition: Symbol.for('ModelDefinition'),
  AppSeeder: Symbol.for('AppSeeder'),
  Container: Symbol.for('Container'),
  UnitOfWork: Symbol.for('UnitOfWork')
};

export const IoCToken = {
  ...core,
  ...serviceTokens,
  ...modelTokens,
  ...repositoryTokens  
};