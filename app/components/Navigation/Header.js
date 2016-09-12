import React, { PropTypes as T } from 'react'

import {
  View,
  Text,
  StyleSheet,
  NavigationExperimental
} from 'react-native'

const {
  Header: NavigationHeader
} = NavigationExperimental;

import colors from '../../styles/colors'

export class Header extends React.Component {
  render() {
    const {style} = this.props;
    const headerStyle = [styles.header, style];
    return (
      <NavigationHeader
        {...this.props}
        style={headerStyle}
        onNavigateBack={this._onBack.bind(this)} />
      )
  }

  _onBack() {
    // on back
    const {actions} = this.props;
    const {navigation} = actions;
    navigation.pop();
  }
}

const styles = StyleSheet.create({
  header: {
  }
})

export default Header;
