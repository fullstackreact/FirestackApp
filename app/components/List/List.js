import React, { PropTypes as T } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ListView
} from 'react-native'

import colors from '../../styles/colors'
import appStyles from '../../styles/app';

export class List extends React.Component {
  static propTypes = {
    initialRows: T.array,
    onRowPress: T.func
  }

  static defaultProps = {
    initialRows: []
  }

  constructor(props, context) {
    super(props, context);

    const dataSource = new ListView.DataSource({
      sectionHeaderHasChanged: this._sectionHeaderHasChanged.bind(this),
      rowHasChanged: this._rowHasChanged.bind(this)
    });

    const {initialRows} = this.props;

    this.state = {
      dataSource: dataSource.cloneWithRows(initialRows)
    }
  }

   _sectionHeaderHasChanged(oldSection, newSection) {
     return oldSection !== newSection;
   }

   _rowHasChanged(oldRow, newRow) {
     return oldRow !== newRow;
   }

  render() {
    const {style} = this.props;
    const headerStyle = [styles.header, style];

    return (
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
    )
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

  _defaultRenderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={appStyles.row}>
        <Text>{rowData.title}</Text>
      </View>
    )
  }

   _renderRow(rowData, sectionID, rowID, highlightRow) {
    const {renderRow} = this.props;

     return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowData, sectionID, rowID, highlightRow);
        }}>
         {renderRow ? 
            renderRow(rowData, sectionID, rowID, highlightRow) :
            this._defaultRenderRow(rowData, sectionID, rowID, highlightRow)}
      </TouchableHighlight>
     )
   }

    _pressRow(...args) {
      const {onRowPress} = this.props;
      if (onRowPress && typeof onRowPress === 'function') {
        onRowPress(...args);
      }
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
  header: {
  }
})

export default List;
