import React from 'react';
import {connect} from 'react-redux'
import {
  View,
  Text
} from 'react-native'

import appStyles from '../../styles/app';

import List from '../../components/List/List'

// Demos
import Online from './Demos/Online';

export const Routes = {
  'online': {
    route: {
      title: 'Online',
      Component: Online
    }
  }
}

export class Presence extends React.Component {
  render() {
    const initialRows = [
      { title: 'Online', key: 'presence.online' }
    ];
    return (
      <View style={appStyles.container}>
        <List 
          initialRows={initialRows}
          renderRow={this._renderRow.bind(this)}
          onRowPress={this._onRowPress.bind(this)}
          />
      </View>
    )
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    console.log(rowData)
    return (
      <View style={[appStyles.row]}>
        <Text>{rowData.title}</Text>
      </View>
    )
  }

  _onRowPress(rowData) {
    const rowKey = rowData.key;
    const {actions} = this.props;
    const {navigation} = actions;
    navigation.push(rowKey, this.props);
  }
}

const mapStateToProps = (state) => ({
  firestack: state.firestack
})
export default connect(mapStateToProps)(Presence)