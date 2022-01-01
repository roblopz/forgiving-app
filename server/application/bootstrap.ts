import './dto/_registerers';
import './resolvers';
import './services';
import '@infraestructure/repository';
import '@infraestructure/models';

import { Seeder } from '@infraestructure/seed/seeder';
import { createContainer } from '@application.core/IoC/container';
import { IoCToken } from '@application.core/IoC/tokens';

export async function init() {
  const container = createContainer();
  const seeder = container.get<Seeder>(IoCToken.AppSeeder);
  await seeder.seed();
}