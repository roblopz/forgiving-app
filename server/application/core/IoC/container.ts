import { Container } from "inversify";
import { Mapper } from "@automapper/core";

import { AppDataContext } from "@infraestructure/appDatacontext";
import { IoCToken } from '@domain/core/IoCToken';
import { appMapper } from "@domain/core/mapper";
import { PlayerService } from "@application/services/playerService";
import { IPlayerService } from "@application/services/IPlayerService";
import { IPlayerRepository } from "@domain/repository/IPlayerRepository";
import { PlayerRepository } from "@infraestructure/repository";

const AppContainer = new Container();

// Special tokens
AppContainer.bind<AppDataContext>(IoCToken.AppDataContext).to(AppDataContext).inSingletonScope();
AppContainer.bind<Mapper>(IoCToken.AppMapper).toConstantValue(appMapper);

// Bind services
AppContainer.bind<IPlayerService>(IoCToken.PlayerService).to(PlayerService);

// Bind repositories
AppContainer.bind<IPlayerRepository>(IoCToken.PlayerRepository).to(PlayerRepository);

export { AppContainer };