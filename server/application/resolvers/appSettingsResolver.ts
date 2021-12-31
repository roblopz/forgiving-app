import { injectable } from 'inversify';
import { Query, Resolver } from 'type-graphql';
import moment from 'moment';

import { AppResolver } from '@application.core/decorators';
import { AppSettingsDTO, ConflictDTO } from '@application/dto/appSettings';

@injectable()
@Resolver(AppSettingsDTO)
@AppResolver()
export class AppSettingsResolver {
  @Query(_returns => AppSettingsDTO)
  async appSettings(): Promise<AppSettingsDTO> {
    const res = new AppSettingsDTO();
    res.currentConflict = new ConflictDTO()
    res.currentConflict.dateStarted = moment('2021-10-31 13:00').toDate();
    return res;
  }
}