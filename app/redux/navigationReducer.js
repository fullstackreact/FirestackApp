const ExamplesList = require('../views/ExamplesList');

const {
  NavigationExperimental,
} = ReactNative;

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

import type {NavigationState} from 'NavigationTypeDefinition';

export type ExamplesListNavigationState = {
  stack: NavigationState
};

const defaultGetReducerForState = (initialState) => (state) => state || initialState;

function getNavigationState(state: any): ?NavigationState {
  if (
    (state instanceof Object) &&
    (state.routes instanceof Array) &&
    (state.routes[0] !== undefined) &&
    (typeof state.index === 'number') &&
    (state.routes[state.index] !== undefined)
  ) {
    return state;
  }
  return null;
}

function StackReducer({initialState, getReducerForState, getPushedReducerForAction}: any): Function {
  const getReducerForStateWithDefault = getReducerForState || defaultGetReducerForState;
  return function (lastState: ?NavigationState, action: any): NavigationState {
    if (!lastState) {
      return initialState;
    }
    const lastParentState = getNavigationState(lastState);
    if (!lastParentState) {
      return lastState;
    }

    const activeSubState = lastParentState.routes[lastParentState.index];
    const activeSubReducer = getReducerForStateWithDefault(activeSubState);
    const nextActiveState = activeSubReducer(activeSubState, action);
    if (nextActiveState !== activeSubState) {
      const nextChildren = [...lastParentState.routes];
      nextChildren[lastParentState.index] = nextActiveState;
      return {
        ...lastParentState,
        routes: nextChildren,
      };
    }

    const subReducerToPush = getPushedReducerForAction(action, lastParentState);
    if (subReducerToPush) {
      return NavigationStateUtils.push(
        lastParentState,
        subReducerToPush(null, action)
      );
    }

    switch (action.type) {
      case 'back':
      case 'BackAction':
        if (lastParentState.index === 0 || lastParentState.routes.length === 1) {
          return lastParentState;
        }
        return NavigationStateUtils.pop(lastParentState);
    }

    return lastParentState;
  };
}