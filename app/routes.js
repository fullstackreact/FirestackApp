import React from 'react'
import {
  View, Text, TouchableHighlight
} from 'react-native'

import toList from './utils/toList'
import appStyles from './styles/app';

import Home from './views/Home';
import Database from './views/Database';
import Authentication from './views/Authentication';
import Messaging, { Routes as MessagingRoutes } from './views/Messaging';
import Presence, { Routes as PresenceRoutes } from './views/Presence'

export type Route = {
  key: String,
  Component: Object,
  title: String
};

export const exampleRoutes = {
  'database': {
    route: {
      title: 'Database',
      Component: Database
    }
  },
  'auth': {
    route: {
      title: 'Authentication',
      Component: Authentication
    }
  },
  'presence': {
    route: {
      title: 'Presence',
      Component: Presence
    },
    children: PresenceRoutes
  },
  'messaging': {
    route: {
      title: 'Messaging',
      Component: Messaging
    },
    children: MessagingRoutes
  }
}

export const routes = toList({
  ...exampleRoutes,
  'home': {
    route: {
      title: 'Home',
      Component: Home,
      headerStyle: {},
    },
    children: {}
  },
});

export default routes;