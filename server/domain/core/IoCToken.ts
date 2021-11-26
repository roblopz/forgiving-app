
const serviceTokens = {
  PlayerService: 'PLAYER_SERVICE',
  UserService: 'USER_SERVICE',
  AuthService: 'AUTH_SERVICE'
};

const repositoryTokens = {
  PlayerRepository: Symbol.for('PLAYER_REPOSITORY'),
  UserRepository: Symbol.for('USER_REPOSITORY')
};

export const IoCToken = {
  ...serviceTokens,
  ...repositoryTokens,
  AppDataContext: Symbol.for('APP_DATA_CONTEXT'),
  AppMapper: Symbol.for('APP_MAPPER'),
  Resolver: Symbol.for('RESOLVER')
};