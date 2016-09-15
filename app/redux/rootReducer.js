import { combineReducers } from 'redux';

const modules = {
  currentUser: require('./modules/currentUser'),
  navigation: require('./modules/navigation'),
}

// const currentUser = require('./reducers/currentUser')
// const navigation = require('./reducers/navigation')
// const feed = require('./reducers/feed')

export let actions = {}

export let reducers = {
  'firestack': state => state || null // filled in later
}
export let initialState = {};

Object.keys(modules).forEach(key => {
  const container = modules[key];
  initialState[key] = container.initialState || {};
  actions[key] = container.actions;
  reducers[key] = container.reducer;
});

export const rootReducer = combineReducers(reducers);
