let defaultEnv = {
  NAME: 'DoGood'
}

let env = {}
if (process.env.NODE_ENV === 'development') {
  env = require('./development')
}

module.exports = Object.assign({}, defaultEnv, env);