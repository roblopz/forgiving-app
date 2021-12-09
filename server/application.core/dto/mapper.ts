import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

export const appMapper = createMapper({
  name: 'appMapper',
  pluginInitializer: classes
});

