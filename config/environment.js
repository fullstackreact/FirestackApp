import { Platform } from 'react-native';

let defaultEnv = {
  NAME: 'DoGood'
}

const NODE_ENV = process.env.NODE_ENV;
let env = {}
if (NODE_ENV === 'development') {
  env = require('./development')
}

try {
  env = Object.assign({}, env, require(`${NODE_ENV}.${Platform.OS}`));
} catch (e) {}

module.exports = Object.assign({}, defaultEnv, env);