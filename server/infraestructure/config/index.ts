import path from 'path';
import { NestedValueOf, Paths } from '@common/util/types';
import { Config } from '@common/config/definition';

process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, '../../../common/config');
import _config from 'config';

function getSetting<S extends Paths<Config>>(setting: S): NestedValueOf<Config, S> {
  return _config.get(setting);
}

export { Config  };
export default { getSetting }