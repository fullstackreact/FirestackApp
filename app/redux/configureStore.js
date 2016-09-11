import { applyMiddleware, combineReducers, createStore } from 'redux'
import { bindActionCreators } from 'redux'
import thunk from 'redux-thunk'

import Firestack from 'react-native-firestack'
import env from '../../config/environment'

import * as currentUser from './modules/currentUser'
import * as navigation from './modules/navigation'

export const configureStore = (initialState = {}) => {
  const middleware = applyMiddleware(thunk);

  const firestack = new Firestack(env.firestack)

  const rootReducer = combineReducers({
    user: currentUser.reducer,
    navigation: navigation.reducer,
    firestack: (state) => firestack
  });

  const store = createStore(
    rootReducer,
    initialState,
    middleware);

  firestack.setStore(store);

  const dispatch = store.dispatch;
  const actions = {
    currentUser: bindActionCreators(currentUser.actions, dispatch)
  }

  return {store,actions}
}

export default configureStore
