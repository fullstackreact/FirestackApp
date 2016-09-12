import React, { Children, PropTypes as T } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight
} from 'react-native'

import Button from './Button'
import Icon from 'react-native-vector-icons/FontAwesome'

export class BackButton extends React.Component {
  static propTypes = {
    backgroundColor: T.string,
    style: T.oneOfType([T.object, T.array]),
    onBack: T.func
  }

  static defaultProps = {
    backgroundColor: '#feff00',
    style: {}
  }

  onPress(evt) {
    if (this.props.onBack) {
      this.props.onBack(evt);
    }
  }

  render() {
    return (
      <Button
        onPress={this.onPress.bind(this)}>
          <Icon name="chevron-left" size={20} />
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10
  },
  button: {
    flex: 1,
    borderRadius: 2,
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonContent: {
    flex: 1,
  }
})

export default BackButton;
