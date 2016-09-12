import React from 'react';

import {
  View,
  Text
} from 'react-native'

import appStyles from '../../styles/app';

export class Database extends React.Component {
  render() {
    console.log('rendering database', this.props);
    return (
      <View style={appStyles.scene}>
        <Text>Database examples</Text>
        <Text>Database examples</Text>
        <Text>Database examples</Text>
        <Text>Database examples</Text>
      </View>
    )
  }
}

export default Database