
const serviceTokens = {
  AuthService: 'AUTH_SERVICE'
};

const modelTokens = {
  PlayerModel: Symbol.for('PLAYER_MODEL'),
  UserModel: Symbol.for('USER_MODEL')
};

const repositoryTokens = {
  PlayerRepository: Symbol.for('PLAYER_REPOSITORY'),
  UserRepository: Symbol.for('USER_REPOSITORY')
};

export const IoCToken = {
  ...serviceTokens,
  ...modelTokens,
  ...repositoryTokens,
  AppMapper: Symbol.for('APP_MAPPER'),
  Resolver: Symbol.for('RESOLVER')
};