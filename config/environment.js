import { Platform } from 'react-native';
import _ from 'lodash';

const NODE_ENV = process.env.NODE_ENV;

let defaultEnv = {
  NAME: 'DoGood'
}

let general = {};
try {
  general = require('./all');
} catch (e) {}

let env = {}
if (NODE_ENV === 'development') {
  env = require('./development')
}

env = _.merge({}, general, env);

module.exports = Object.assign({}, defaultEnv, env);