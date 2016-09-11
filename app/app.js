'use strict';

import React from 'react'
import { AppRegistry, Text, View } from 'react-native';
import App from './containers/App';

import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore';

const {firestack, store, actions} = configureStore();

const wrapper = (props) => {
  return (
    <Provider store={store}>
      <App actions={actions} firestack={firestack} />
    </Provider>
  )
}

export default wrapper;