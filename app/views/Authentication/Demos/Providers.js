import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import appStyles from '../../../styles/app';

export class Providers extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  render() {
    return (
      <View>
        <View style={appStyles.container}>
          <Text>
            This is a test for dealing with Auth. 
          </Text>
        </View>
      </View>
    )
  }

}

export default Providers