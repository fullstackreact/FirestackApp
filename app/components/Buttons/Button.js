import React, { Children, PropTypes as T } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight
} from 'react-native'

export class Button extends React.Component {
  static propTypes = {
    backgroundColor: T.string,
    underlayColor: T.string,
    children: T.element.isRequired,
    style: T.oneOfType([T.object, T.array])
  }
  static defaultProps = {
    backgroundColor: '#feff00',
    underlayColor: '#a9d9d4',
    style: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: new Animated.Value(0),
      active: false
    }
  }

  renderButton() {
    const {children, style} = this.props;
    const props = Object.assign({}, this.props, {});
    return (
      <View style={[styles.buttonContent, style]}>
        {Children.map(children, c => React.cloneElement(c, props))}
      </View>
    );
  }

  onPress(evt) {
    if (this.props.onPress) {
      this.props.onPress(evt);
    }
  }

  render() {
    const animatedStyles = [
      styles.button,
      {backgroundColor: this.props.backgroundColor}
    ]
    const {underlayColor} = this.props;

    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnHighlight.bind(this)}
        onShowUnderlay={this._onHighlight.bind(this)}
        style={styles.wrapper}
        underlayColor={underlayColor}
        onPress={this.onPress.bind(this)}>
        <Animated.View
          style={animatedStyles}>
            {this.renderButton()}
        </Animated.View>
      </TouchableHighlight>
    )
  }

  _onHighlight() {
    this.setState({active: true})
  }

  _onUnHighlight() {
    this.setState({active: false})
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

export default Button;
