import { Container as InversifyContainer } from 'inversify';

import { IoCToken } from './tokens';
import { appMapper } from '../dto';

const GlobalContainer = new InversifyContainer();
GlobalContainer.bind(IoCToken.AppMapper).toConstantValue(appMapper);
GlobalContainer.bind(IoCToken.Container).toConstantValue(GlobalContainer);

export { GlobalContainer }