/* eslint-disable prettier/prettier */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { merge } from 'lodash';

// const YAML_CONFIG_PROD = 'production.yaml';
// const YAML_CONFIG_DEV = 'development.yaml';
// export default () => {
//   return yaml.load(
//       (process.env.NODE_ENV==='production')?
//         readFileSync(join(__dirname, YAML_CONFIG_PROD), 'utf8')
//       : readFileSync(join(__dirname, YAML_CONFIG_DEV), 'utf8'),
//   ) as Record<string, any>;
// };

const YAML_CONFIG_BASE = 'base.yaml';
const YAML_CONFIG_PROD = 'production.yaml';
const YAML_CONFIG_DEV = 'development.yaml';

export default () => {
  const baseConfig = yaml.load(readFileSync(join(__dirname, YAML_CONFIG_BASE), 'utf8')) as Record<string, any>;
  const envConfig = yaml.load(
    process.env.NODE_ENV === 'production'
      ? readFileSync(join(__dirname, YAML_CONFIG_PROD), 'utf8')
      : readFileSync(join(__dirname, YAML_CONFIG_DEV), 'utf8')
  ) as Record<string, any>;

  return merge(baseConfig, envConfig);
};