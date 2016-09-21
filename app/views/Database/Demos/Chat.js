import React from 'react'

import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import appStyles from '../../../styles/app';
import { GiftedChat } from 'react-native-gifted-chat';


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
    .limitToLast(10)
    // .once('value', (snapshot) => {
    //     const previousMessages = this.state.messages;
    //     const messages = this.messagesFromSnapshot(snapshot);
    //     this.setState({
    //       messages: GiftedChat.append(previousMessages, messages)
    //     }, () => {
          .on('child_added', (snapshot) => {
            this.setState({
              messages: GiftedChat.append(this.state.messages, snapshot.val())
            })
          })
        // })
      // });
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