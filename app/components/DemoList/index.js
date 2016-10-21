import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux'

import {
  View,
  Text
} from 'react-native'

import appStyles from '../../styles/app';
import List from '../../components/List/List'

export class DemoList extends React.Component {
  static propTypes = {
    routes: T.object.isRequired,
    routeKey: T.string.isRequired
  }

  render() {
    const { routes, routeKey } = this.props;

    const initialRows = Object.keys(routes).map(key => {
      const routeCfg = routes[key];
      return { title: routeCfg.route.title, key: `${routeKey}.${key}` }
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
export default connect(mapStateToProps)(DemoList)