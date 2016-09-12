import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  View,
  Text,
  NavigationExperimental
} from 'react-native'

import FirestackNavigator from '../components/Navigation/Navigator'

export class App extends React.Component {

  _navigate({type}) {
    console.log('_navigate called with type', type);
  }

  render() {
    const {navigationState} = this.props;
    return (
      <View style={styles.container}>
        <FirestackNavigator
          {...this.props}
          navigationState={navigationState}
          navigate={this._navigate.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect(state => {
  return {
    navigationState: state.navigation
  }
})(App);