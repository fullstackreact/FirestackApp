import React from 'react'

import {
  View,
  Text,
  TouchableHighlight
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

    firestack.cloudMessaging.onRemoteMessage(notification => {
      console.log('Received remote notification', notification);
    })

    firestack.cloudMessaging.onLocalMessage(notification => {
      console.log('Received local notification', notification);
    })

    // firestack.cloudMessaging.listenForReceiveNotification((msg) =>{
    //   console.log('Receive Messages:'+msg.data);
    //   console.log('Receive Messages:'+msg.notification);
    // });
  }

  _sendHi() {
    const {firestack} = this.props;
    firestack.cloudMessaging.sendMessage({
      alertBody: "Some message",
      alertAction: "view"
    })
  }

  render() {
    return (
      <View>
        <Text>Hi</Text>
        <TouchableHighlight onPress={this._sendHi.bind(this)} style={appStyles.row}>
          <Text>Hi</Text>
        </TouchableHighlight>
      </View>
    )
  }

}

export default Setup;