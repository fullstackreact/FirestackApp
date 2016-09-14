import React from 'react';

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
    const db = firestack.database;
    this.db = db;
    db.setPersistence(true);
  }

  componentDidMount() {
    const roomId = 'roomId';
    const ref = this.db.ref('chat-messages').child(roomId);
    ref.keepSynced(true);
    ref.orderByKey().limitToLast(3).once('value').then(snapshot => {
      console.log('snapshot ->', snapshot);
    });
  }

  render() {
    return (
      <View style={appStyles.scene}>
        <Text>Database examples</Text>
        <Text>Database examples</Text>
        <Text>Database examples</Text>
        <Text>Database examples</Text>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  firestack: state.firestack
})
export default connect(mapStateToProps)(Database)