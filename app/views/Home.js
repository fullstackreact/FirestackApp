import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ListView
} from 'react-native'

import appStyles from '../styles/app';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      sectionHeaderHasChanged: this._sectionHeaderHasChanged.bind(this),
      rowHasChanged: this._rowHasChanged.bind(this)
    })

    this.state = {dataSource}
  }

  render() {
    return (
      <View style={appStyles.container}>
        <ListView
            ref="listView"
            scrollRenderAheadDistance={0}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderSectionHeader={this._renderSectionHeader.bind(this)}
            renderRow={this._renderRow.bind(this)}
            renderFooter={this._renderFooter.bind(this)}
            />
      </View>
    )
  }

   /*
   * List stuff
   */
   _getListViewData(events) {
    let data = {};
    let sectionIds = [];

    events.items
      .map((event) => {
        const time = moment(event.startAt).fromNow();
        let section = event.name;
        if (sectionIds.indexOf(time) === -1) {
          sectionIds.push(time);
          data[time] = [];
        }
      data[time].push(event);
    });

    return {data, sectionIds};
  }

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

   _renderRow(rowData) {
     return (
       <EventItem
         key={rowData.uid}
         event={rowData} />
     )
   }

   _renderFooter() {
    return (
      <View style={[appStyles.container, styles.scrollSpinner]}>
        <Text>Why not create an event?</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

export default Home;