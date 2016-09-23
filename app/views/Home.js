import React from 'react';
import {
  NavigationExperimental,
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  Dimensions
} from 'react-native'

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

const {height, width} = Dimensions.get('window')
import appStyles from '../styles/app';
import {connect} from 'react-redux';

// Routes
import {routes, exampleRoutes} from '../routes'

export class Home extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      sectionHeaderHasChanged: this._sectionHeaderHasChanged.bind(this),
      rowHasChanged: this._rowHasChanged.bind(this)
    })

    const routeRows = Object.keys(exampleRoutes)
                        .reduce((sum, name) => sum.concat({
                          key: name, 
                          title: name.toUpperCase(),
                          route: routes[name]
                        }), []);

    this.state = {
      dataSource: dataSource.cloneWithRows(routeRows)
    }
  }

  render() {
    return (
      <View style={[appStyles.scene, styles.wrapper]}>
        <ListView
            ref="listView"
            scrollRenderAheadDistance={0}
            automaticallyAdjustContentInsets={true}
            dataSource={this.state.dataSource}
            renderSectionHeader={this._renderSectionHeader.bind(this)}
            renderRow={this._renderRow.bind(this)}
            renderFooter={this._renderFooter.bind(this)}
            renderSeparator={this._renderSeparator.bind(this)}
            />
      </View>
    )
  }

   /*
   * List stuff
   */
   _sectionHeaderHasChanged(oldSection, newSection) {
     return oldSection !== newSection;
   }

   _rowHasChanged(oldRow, newRow) {
     return oldRow !== newRow;
   }

   _renderSectionHeader(data, sectionId) {
     return <View></View>; // empty, for now
     return (
       <View style={styles.sectionHeader}>
         <Text style={styles.sectionHeaderText}>{sectionId}</Text>
       </View>
     )
   }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

   _renderRow(rowData, sectionID, rowID, highlightRow) {
     return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowData.key);
        }}>
         <View style={appStyles.row}>
          <Text style={[appStyles.rowText]}>{rowData.title}</Text>
         </View>
      </TouchableHighlight>
     )
   }

    _pressRow(rowKey) {
      const {actions} = this.props;
      const {navigation} = actions;
      navigation.push(rowKey, this.props);
    }

   _renderFooter() {
    return (
      <View style={[appStyles.container, styles.scrollSpinner]}>
        <Text></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: "#eeeeee",
  },
  sectionHeader: {
    // flex: 1,
  },
  sectionHeaderText: {
    fontSize: 22,
    padding: 10,
  }
})

const mapStateToProps = (state) => ({
  firestack: state.firestack
})

export default connect(mapStateToProps)(Home);