import React, { PropTypes as T } from 'react'

import {
  StyleSheet,
  View,
  Text,
  NavigationExperimental,
  Easing,
  Dimensions
} from 'react-native'

const {
  Header: NavigationHeader,
  Transitioner: NavigationTransitioner,
  CardStack: NavigationCardStack
} = NavigationExperimental;

const { width, height } = Dimensions.get('window');

import routes from '../../routes';
import appStyles from '../../styles/app'
import Header from './Header'
import Scene from './Scene';
import BackButton from '../Buttons/BackButton'

export class FirestackNavigator extends React.Component {
  static propTypes: {
    navigationState: NavigationPropTypes.navigationState.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  _render(transitionProps) {
    return (
      <View style={styles.container}>
        {this._renderHeader(transitionProps)}
        {transitionProps.scenes
              .map(scene => {
                const sceneProps = {
                  ...transitionProps,
                  scene,
                };
                return this._renderScene(sceneProps)
              })}
      </View>
    )
  }

  _renderScene(sceneProps) {
    const {scene} = sceneProps;
    const route = this._lookupRoute(scene.route);
    const {actions, currentUser, navigationState} = this.props;
    const {noHeader} = route;

    const createElement = (scene, Component) => {
      const componentProps = Object.assign({}, sceneProps, {
        actions, route, currentUser
      })
      return (
        <Scene
          {...componentProps}
          key={scene.key}
          firestack={this.props.firestack}
          navigate={this._navigate.bind(this)}>
            <Component />
        </Scene>
      )
    }

    let Component = route.Component;
    if (!Component) {
      Component = (props) => (
        <View style={styles.sceneWithHeader}>
          <Text>{route.key} Scene not yet implemented</Text>
        </View>
      )
    }

    return (
      <View key={scene.key} style={[appStyles.scene, !noHeader && styles.sceneWithHeader]}>
        {createElement(scene, Component)}
      </View>
    )
  }

  _navigate() {
    console.log('navigate called in Navigator')
  }

  _renderHeader(sceneProps) {
    const {actions, navigationState} = this.props;
    const {scene} = sceneProps;
    let {route} = scene;

    if (!route.noHeader) {
      // Route not implemented yet, use a default header
      if (!route.Component && navigationState.index > 0) {
        const title = route.key
        route = Object.assign({}, routes.default, {title, actions});
      }

      // route.actions = actions
      const {headerStyle} = route;
      let headerProps = Object.assign({}, sceneProps, {
        route,
        actions,
        style: headerStyle || {}
      });

      const {title, titleComponent} = route;
      if (title || titleComponent) {
        headerProps.renderTitleComponent = (props) => {
          return titleComponent ?
                  titleComponent({...props, actions}) : (<NavigationHeader.Title>{title}</NavigationHeader.Title>);
        }
      }

      const {leftComponent, rightComponent} = route;

      if (leftComponent) {
        headerProps.renderLeftComponent = 
          leftComponent.bind(null, actions);
      }

      if (rightComponent) {
        headerProps.renderRightComponent =
          rightComponent.bind(null, actions);
      }

      return (<Header {...headerProps} />)
    }
  }

  _lookupRoute(routeObject) {
    const key = routeObject.key || 'default';
    return routes[key];
  }

  _configureTransition() {
    const easing = Easing.inOut(Easing.ease);
    return {easing, duration: 250}
  }

  _back() {
    console.log('_back called in Navigator');
    const {actions} = this.props;
    const {navigation} = actions;
    navigation.pop();
  }

  render() {
    const {
      navigationState,
      scenes
    } = this.props;
    const stackKey = `stack_${'home'}`

    return (
      <View style={styles.container}>
        <NavigationCardStack
          key={stackKey}
          onNavigateBack={this._back.bind(this)}
          navigationState={navigationState}
          renderHeader={this._renderHeader.bind(this)}
          renderScene={this._renderScene.bind(this)}
          style={styles.navigatorCardStack}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigatorCardStack: {
    flex: 20
  },
  scene: {
    backgroundColor: 'white'
  },
  sceneWithHeader: {
    marginTop: 0
  }
})

export default FirestackNavigator