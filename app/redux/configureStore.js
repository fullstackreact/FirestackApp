import { applyMiddleware, combineReducers, createStore } from 'redux'
import { bindActionCreatorsToStore } from 'redux-module-builder';
import { compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

import Firestack from 'react-native-firestack'
import env from '../../config/environment'

import { rootReducer, actions, initialState } from './rootReducer';

export const configureStore = (userInitialState = {}) => {
  let middleware = [
    thunkMiddleware,
  ]

  let tools = [];
  if (process.env.NODE_ENV === 'development') {
    // const devTools = require('remote-redux-devtools');
    // tools.push(devTools());
  }

  tools.push(autoRehydrate())

  const firestack = new Firestack(env.firestack)

  let finalCreateStore;
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    ...tools
  )(createStore);

  const finalInitialState = Object.assign({},
    initialState,
    userInitialState,
    {firestack}
  );

  const store = finalCreateStore(
    rootReducer,
    finalInitialState
  );
  
  const persistor = persistStore(store, {
    storage: AsyncStorage, 
    blacklist: ['firestack']
  });

  // persistor.purge();

  firestack.setStore(store);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const {rootReducer} = require('./rootReducer').default;
      store.replaceReducer(rootReducer);
    });
  }

  const boundActions = bindActionCreatorsToStore(actions, store);
  return {
    store,
    actions: boundActions
  }
}

export default configureStore
