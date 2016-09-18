import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import appStyles from '../../../styles/app';

export class Online extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;
    const presence = firestack.presence;

    presence.on('auser')
      .setOnline()
      .onConnect(ref => {
        console.log('connected', ref);
        ref.onDisconnect().remove();
      });
  }

  componentWillUnmount() {
    const {firestack} = this.props;
    const presence = firestack.presence;
    presence.on('auser').setOffline();  
  }

  _sendHi() {
    const {firestack} = this.props;
  }

  render() {
    return (
      <View>
        <View style={appStyles.row}>
          <Text>
            This is a test for dealing with Presence. 
          </Text>
        </View>
      </View>
    )
  }

}

export default Online