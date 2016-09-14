import React, { Children, Component, PropTypes } from 'react'

import {
  Animated,
  View,
  Text,
  StyleSheet,
  NavigationExperimental
} from 'react-native';

const {
  PropTypes: NavigationPropTypes,
  StateUtils: NavigationStateUtils,
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
} = NavigationExperimental;

const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator,
} = NavigationCard;

import styles from '../../styles/app';

class Scene extends Component {
  props: NavigationSceneRendererProps & {
    navigate: Function,
  };

  static propTypes = {
    ...NavigationPropTypes.SceneRendererProps,
    navigate: PropTypes.func.isRequired,
  };

  render(): ReactElement<any> {
    const {scene, navigate, children, firestack} = this.props;
    const childProps = Object.assign({}, this.props, {firestack})
    return (
      <Animated.View
        style={[styles.scene, this._getAnimatedStyle()]}>
          {Children.map(children, 
            c => React.cloneElement(c, childProps))}
      </Animated.View>
    );
  }

  _getAnimatedStyle(): Object {
    const {
      layout,
      position,
      scene,
    } = this.props;

    const {
      index,
    } = scene;

    const inputRange = [index - 1, index, index + 1];
    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange,
      outputRange: ([width, 0, -10]: Array<number>),
    });

    return {
      transform: [
        { translateX },
      ],
    };
  }
}

export default Scene