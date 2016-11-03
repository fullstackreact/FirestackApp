import React, { Children as C } from 'react';

import {
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'

import List from '../../components/List/List'
import appStyles from '../../styles/app';

import Chat from './Demos/Chat';
import Ordering from './Demos/Ordering';

export const Routes = {
  'Chat example': {
    route: {
      title: 'Chat example',
      Component: Chat
    }
  },
  'Ordering example': {
    route: {
      title: 'Ordering example',
      Component: Ordering
    }
  }
}

export class Database extends React.Component {
  render() {
    const initialRows = Object.keys(Routes).map(key => {
      const routeCfg = Routes[key];
      return { title: routeCfg.route.title, key: `database.${key}` }
    })
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
        <Text style={[appStyles.rowText]}>{rowData.title}</Text>
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
export default connect(mapStateToProps)(Database)