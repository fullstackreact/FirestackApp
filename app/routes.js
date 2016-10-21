import React from 'react'
import {
  View, Text, TouchableHighlight
} from 'react-native'

import toList from './utils/toList'
import appStyles from './styles/app';

import Home from './views/Home';
import Database, { Routes as DatabaseRoutes } from './views/Database';
import Authentication, { Routes as AuthRoutes } from './views/Authentication';
import Messaging, { Routes as MessagingRoutes } from './views/Messaging';
import Presence, { Routes as PresenceRoutes } from './views/Presence'
import Analytics, { Routes as AnalyticsRoutes } from './views/Analytics';
import Storage, { Routes as StorageRoutes } from './views/Storage';

export type Route = {
  key: String,
  Component: Object,
  title: String
};

export const exampleRoutes = {
  'analytics': {
    route: {
      title: 'Analytics',
      Component: Analytics
    },
    children: AnalyticsRoutes
  },
  'database': {
    route: {
      title: 'Database',
      Component: Database
    },
    children: DatabaseRoutes
  },
  'auth': {
    route: {
      title: 'Authentication',
      Component: Authentication
    },
    children: AuthRoutes
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
  },
  'storage': {
    route: {
      title: 'Storage',
      Component: Storage
    },
    children: StorageRoutes
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