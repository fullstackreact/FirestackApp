import React, { Children as C } from 'react';

import {
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'

import appStyles from '../../styles/app';

export class Database extends React.Component {
  constructor(props) {
    super(props);

    const {firestack} = this.props;
    // firestack.database.setPersistence(false);

    this.state = {
      children: []
    }
  }

  componentDidMount() {
    const {firestack} = this.props;

    const pRef = firestack.presence
      // .on('/users/connected')
      .setOnline('auser')
      .onConnect(ref => {
        console.log('connected!', ref)
      })

    const roomId = 'roomId';
    const ref = firestack.database.ref('chat-messages').child(roomId);
    ref.on('value', (snapshot) => {
      const val = snapshot.val();
      const children = Object.keys(val)
                        .map(key => {
                          return {...val[key], key};
                        });
      this.setState({children})
    })
    // ref.keepSynced(true);
    // ref.orderByKey().limitToLast(3).on('value', snapshot => {
    //   const o = Object.keys(snapshot.val());
    //   ref.child(o[0]).setAt({
    //     from: 'me',
    //     msg: 'Hello you guys'
    //   })
    // });
  }

  componentWillUnmount() {
    const {firestack} = this.props;
    firestack.presence.setOffline();
    firestack.database.cleanup();
  }

  render() {
    return (
      <View style={appStyles.scene}>
        {this.state.children.map(c => {
          return <Text key={c.key}>{c.msg}</Text>
        })}
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  firestack: state.firestack
})
export default connect(mapStateToProps)(Database)