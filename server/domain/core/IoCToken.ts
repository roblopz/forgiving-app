
const serviceTokens = {
  PlayerService: 'PLAYER_SERVICE'
};

const repositoryTokens = {
  PlayerRepository: Symbol.for('PLAYER_REPOSITORY')
};

export const IoCToken = {
  ...serviceTokens,
  ...repositoryTokens,
  AppDataContext: Symbol.for('APP_DATA_CONTEXT'),
  AppMapper: Symbol.for('APP_MAPPER')
};