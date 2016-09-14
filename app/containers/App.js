import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  View,
  Text,
  NavigationExperimental
} from 'react-native'

import FirestackNavigator from '../components/Navigation/Navigator'
import sizing from '../utils/sizing';
import Entrance from '../components/Entrance'

export class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      showEntrance: true
    }
  }

  _hideEntrance() {
    this.setState({showEntrance: false});
  }

  _navigate({type}) {
    console.log('_navigate called with type', type);
  }

  render() {
    let entrance = this.state.showEntrance ?
      <Entrance hideThis={() => this._hideEntrance() }/> :
      <View></View>;

    const {firestack, navigationState} = this.props;

    return (
      <View style={styles.container}>
        <FirestackNavigator
          {...this.props}
          firestack={firestack}
          navigationState={navigationState}
          navigate={this._navigate.bind(this)} />
        {/* entrance */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: sizing.width,
    height: sizing.height
  }
})

export default connect(state => {
  return {
    navigationState: state.navigation,
    firestack: state.firestack
  }
})(App);