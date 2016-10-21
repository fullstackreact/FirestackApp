import React from 'react';
import {connect} from 'react-redux'
import {
  View,
  Text
} from 'react-native'

import appStyles from '../../styles/app';

import List from '../../components/List/List'
import DemoList from '../../components/DemoList';

// Demos
import Upload from './Demos/Upload';

export const Routes = {
  'upload': {
    route: {
      title: 'Upload',
      Component: Upload
    }
  }
}

export class Storage extends React.Component {
  render() {
    return (
      <DemoList routes={Routes} routeKey='storage' />
    );
  }
}

export default Storage;