import React from 'react';

import {
  View,
  Text
} from 'react-native'

import appStyles from '../../styles/app';

export class Authentication extends React.Component {
  render() {
    return (
      <View style={appStyles.container}>
        <Text>Authentication examples</Text>
      </View>
    )
  }
}

export default Authentication