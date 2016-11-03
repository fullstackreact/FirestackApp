import React from 'react'

import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import appStyles from '../../../styles/app';
import { GiftedChat } from 'react-native-gifted-chat';

const unique = xs => {
  let visited = {};
  return xs.filter(x => {
    if (visited[x]) return;
    visited[x] = true;
    return x;
  });
}

const firebaseRefName = 'chat-messages/database-demo';
export class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: true
    };
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    const {firestack} = this.props;
    const ref = firestack.database.ref(firebaseRefName)
    
    ref
    .orderByChild('createdAt')
    .endAt('temp-id-484903')
    .limitToLast(10)
          .on('child_added', (snapshot) => {
            const msg = {
              ...snapshot.val()
            };

            const {messages} = this.state;
            const msgIds = messages.map(m => m._id);
            console.log(msgIds);

            if (msgIds.indexOf(msg._id) < 0) {
              this.setState({
                messages: GiftedChat.append(this.state.messages, msg)
              });
            }
          });
  }

  componentWillUnmount() {
    this.props.firestack.database.ref(firebaseRefName).off();
  }

  messagesFromSnapshot(snapshot) {
    const messageObj = snapshot.childrenCount > 0 ? snapshot.val() : [];
    return Object.keys(messageObj)
                      .map(key => messageObj[key])
                      .sort((a, b) => a.createdAt < b.createdAt);
  }

  onSend(messages = []) {
    const {firestack} = this.props;
    firestack.database.ref(firebaseRefName)
      .push()
      .then(msgRef => msgRef.setAt(messages[0]))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    )
  }

}

export default Chat;
