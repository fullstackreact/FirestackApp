import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import appStyles from '../../../styles/app';

export class Setup extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;

    firestack.cloudMessaging.getToken().then(function (token) {
      console.log('device token', token);
    });

    firestack.cloudMessaging.subscribeToTopic("setup_topic").then(function (topic) {
        console.log('Subscribe:'+topic);
    }).catch(function(err){
       console.error(err);
    });

    firestack.cloudMessaging.listenForReceiveNotification((msg) =>{
      console.log('Receive Messages:'+msg.data);
      console.log('Receive Messages:'+msg.notification);
    });
  }

  _sendHi() {
    const {firestack} = this.props;
    firestack.cloudMessaging.send("hi", "bee", 2, "Alerting")
  }

  render() {
    return (
      <View>
        <Text>Hi</Text>
        <View style={appStyles.row}>
          <Text onPress={this._sendHi.bind(this)}>Hi</Text>
        </View>
      </View>
    )
  }

}

export default Setup;