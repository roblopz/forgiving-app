import _config from 'config';

import { NestedValueOf, Paths } from '../util/typeUtil';
import { Config } from '../../config/definition';

function getSetting<S extends Paths<Config>>(setting: S): NestedValueOf<Config, S> {
  return _config.get(setting);
}

export {
  Config  
};

export default {
  getSetting
}