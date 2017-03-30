import {createConstants, createReducer} from 'redux-module-builder'
import {REHYDRATE} from 'redux-persist/constants'
import * as NavUtils from 'NavigationStateUtils'

import routes from '../../routes'

export const types = createConstants('navigation')(
  'INIT',
  'PUSH',
  'POP',
  'JUMP_TO_KEY',
  'JUMP_TO_INDEX',
  'RESET',
  'FORWARD',
  'REPLACE_AT',
  'REPLACE_AT_INDEX',
  'TOGGLE_MENU'
)

export const actions = {
  // init: firstRoute => dispatch => dispatch({type: types.INIT, payload: firstRoute}),
  push: (routeKey, routeProps={}) => {
    const route = Object.assign({}, {key: routeKey}, routes[routeKey])
    return {
      type: types.PUSH,
      route
    }
  },
  pop: () => ({type: types.POP}),
  jumpToKey: (key) => ({type: types.JUMP_TO_KEY, key}),
  jumpToIndex: (index) => ({type: types.JUMP_TO_INDEX, index}),
  reset: (nextRoutes, index) => ({type: types.RESET, payload: {index, nextRoutes}}),
  forward: () => ({type: types.FORWARD}),
  replaceAt: (key, route) => ({type: types.REPLACE_AT, payload: { key, route }}),
  replaceAtIndex: (index, route) => ({type: types.REPLACE_AT_INDEX, payload: { index, route }}),
  toggleMenu: () => ({type: types.TOGGLE_MENU})
}

const getRoutesForKeys = (keys) => keys.map(key => Object.assign({}, routes[key], {key}))

const initialRoutes = [routes['home']]
const reset = (state, payload = {}) => {
  const {nextRoutes, index} = payload;
  let newIndex = index || 0;
  const navRoutes = (nextRoutes && nextRoutes.length > 0) ? nextRoutes : initialRoutes;
  const newRoutes = getRoutesForKeys(navRoutes)

  return NavUtils.reset(state, newRoutes, newIndex);
}
const replaceAt = (state, action) => {
  let {route, key} = action.payload;
  if (typeof route === "string")
    route = routes[route];
  return NavUtils.replaceAt(state, key, route);
}
const replaceAtIndex = (state, action) => {
  let {route, index} = action.payload;
  if (typeof route === "string")
    route = routes[route];

  return NavUtils.replaceAtIndex(state, index, route);
}

export const reducer = createReducer({
  [REHYDRATE]: (state, {payload}) => {
    const {navigation} = payload;
    const index = navigation ? navigation.index : 0;
    // return NavUtils.reset(state, [routes['welcome']]);
    const navRoutes = navigation ? navigation.routes : initialRoutes;
    const newRoutes = navRoutes
      .map(route => Object.assign({}, routes[route.key], route));

    return NavUtils.reset(state, newRoutes, index);
  },
  [types.INIT]: (state, {payload}) => ({
    ...state,
    ready: true,
    routes: state.routes.concat(payload)
  }),
  [types.PUSH]: (state, {route}) => {
    const {routes, index} = state;
    if (routes[index].key === (route && route.key)) return state;
    return NavUtils.push(state, route);
  },
  [types.POP]: (state) => {
    if (state.index === 0 || state.routes.length === 1) return state;
    return NavUtils.pop(state);
  },
  [types.JUMP_TO_KEY]: (state, {key}) => {
    return NavUtils.jumpTo(state, key);
  },
  [types.JUMP_TO_INDEX]: (state, {index}) => {
    return NavUtils.jumpToIndex(state, index);
  },
  [types.RESET]: (state, {payload}) => reset(state, payload),
  [types.FORWARD]: state => NavUtils.forward(state),
  [types.REPLACE_AT]: (state, action) => replaceAt(state, action),
  [types.REPLACE_AT_INDEX]: (state, action) => replaceAtIndex(state, action),
  [types.TOGGLE_MENU]: (state) => ({
    ...state,
    showMenu: !state.showMenu
  })
  
});

export const initialState = {
  index: 0,
  routes: initialRoutes,
  showMenu: false
  // routes: [routes['signup']]
}
