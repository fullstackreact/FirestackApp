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

    firestack.messaging().getToken().then(function (token) {
      console.log('device token', token);
    });

    firestack.messaging().subscribeToTopic("setup_topic").then(function (topic) {
        console.log('Subscribe:'+topic);
    }).catch(function(err) {
       console.error(err);
    });

    firestack.messaging().onRemoteMessage(notification => {
      console.log('Received remote notification', notification);
    })

    firestack.messaging().onLocalMessage(notification => {
      console.log('Received local notification', notification);
    })

    // firestack.messaging.listenForReceiveNotification((msg) =>{
    //   console.log('Receive Messages:'+msg.data);
    //   console.log('Receive Messages:'+msg.notification);
    // });
  }

  _sendHi() {
    const {firestack} = this.props;
    firestack.messaging().sendMessage({
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