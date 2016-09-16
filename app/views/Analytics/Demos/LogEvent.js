import React from 'react'

import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import appStyles from '../../../styles/app';

export class LogEvent extends React.Component {

  _logEvent() {
    const {firestack} = this.props;
    firestack.analytics.logEventWithName('simpleEvent', {
      createdAt: new Date().getTime(),
      from: 'FirestackApp'
    })
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._logEvent.bind(this)} style={appStyles.row}>
          <Text>Log an event</Text>
        </TouchableHighlight>
      </View>
    )
  }

}

export default LogEvent;