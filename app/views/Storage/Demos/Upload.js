import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import appStyles from '../../../styles/app';

export class UploadDemo extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  _sendHi() {
    const {firestack} = this.props;
  }

  render() {
    return (
      <View>
        <View style={appStyles.row}>
          <Text>
            This is a test for dealing with Uploads. 
          </Text>
        </View>
      </View>
    )
  }

}

export default UploadDemo