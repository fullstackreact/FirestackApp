import React from 'react'
import {
  View, Text, TouchableHighlight
} from 'react-native'

import toList from './utils/toList'
import appStyles from './styles/app';

import Home from './views/Home';

export const routes = toList({
  'home': {
    route: {
      title: 'Home',
      Component: Home
    },
    children: {}
  }
});

export default routes;