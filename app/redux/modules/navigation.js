import React from 'react';

import {
  NavigationExperimental,
} from 'react-native'

const {
  PropTypes: NavigationPropTypes,
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

export const CONSTANTS = {
}

const initialState = {
  index: 0,
  routes: [{key: 'home'}]
}
export const reducer = (state = initialState, action) => {

  switch(action) {
    case 'push':
      const route = {key: 'route-' + (state.routes.length + 1)};
      return NavigationStateUtils.push(state, route);
    case 'pop':
      return NavigationStateUtils.pop(state);
  }
  return state;
}

export const actions = {
}
