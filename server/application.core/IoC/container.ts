import { Container as InversifyContainer } from 'inversify';
import { IoCToken } from './tokens';
import { appMapper } from '../dto';

const Container = new InversifyContainer();
Container.bind(IoCToken.AppMapper).toConstantValue(appMapper);

export { Container };