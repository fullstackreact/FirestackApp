import React, { PropTypes as T } from 'react'

import {
  StyleSheet,
  View,
  Text,
  NavigationExperimental
} from 'react-native'

const {
  Header: NavigationHeader
} = NavigationExperimental;

import colors from '../../styles/colors'

export class Header extends React.Component {
  render() {
    return (
      <NavigationHeader
        {...this.props}
        style={styles.header}
        onNavigateBack={this._onBack.bind(this)} />
      )
  }

  _onBack() {
    // on back
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white
  }
})

export default Header;
