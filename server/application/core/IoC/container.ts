import { Container } from "inversify";
import { Mapper } from "@automapper/core";

import { AppDataContext } from "@infraestructure/appDatacontext";
import { IoCToken } from '@domain/core/IoCToken';
import { appMapper } from "@domain/core/mapper";

const AppContainer = new Container();

// Special tokens
AppContainer.bind<AppDataContext>(IoCToken.AppDataContext).to(AppDataContext).inSingletonScope();
AppContainer.bind<Mapper>(IoCToken.AppMapper).toConstantValue(appMapper);

export { AppContainer };