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

export class FirestackNavigator extends React.Component {
  static propTypes: {
    navigationState: NavigationPropTypes.navigationState.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  _render(props) {
    const {scene} = props;
    return (
      <View style={appStyles.container} key={scene.key}>
        {this._renderHeader(props)}
        {props.scenes
              .map(scene => this._renderScene({ ...props, scene }))}
      </View>
    );
  }

  _renderScene(sceneProps) {
    const {scene} = sceneProps;
    const {route} = scene;
    const definedRoute = this._lookupRoute(route);

    let Component = definedRoute.Component;
    if (!Component) {
      Component = (
        <View style={styles.scene} key={sceneProps.scene.key}>
          <Text>Render scene</Text>
        </View>
      )
    }

    return React.createElement(Component, {
      ...this.props,
      ...sceneProps,
      key: scene.key,
      route: definedRoute
    });
  }

  _renderHeader(sceneProps) {
    const {actions, navigationState} = this.props;
    const {scene} = sceneProps;
    let route = this._lookupRoute(scene.route);

    if (!route.noHeader) {
      // Route not implemented yet, use a default header
      if (!route.Component && navigationState.index > 0) {
        const title = route.key
        route = Object.assign({}, routes.default, {title, actions});
      }

      route.actions = actions
      const {headerStyle} = route;
      let headerProps = Object.assign({}, sceneProps, {
        route,
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
      headerProps.renderLeftComponent = leftComponent ?
          leftComponent.bind(null, actions) : () => (<View />)
      headerProps.renderRightComponent = rightComponent ?
          rightComponent.bind(null, actions) : () => (<View />)

      return (<Header {...headerProps} />)
    }
  }

  _lookupRoute(routeObject) {
    const key = routeObject.key || 'default';
    return routes[key];
  }

  _configureTransition() {
    const easing = Easing.inOut(Easing.ease);
    return {easing, duration: 200}
  }

  render() {
    const {navigationState} = this.props;
    return (
      <NavigationTransitioner
        navigationState={navigationState}
        render={(transitionProps) => this._render(transitionProps)}
        configureTransition={this._configureTransition}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  scene: {
    backgroundColor: '#E9E9EF',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    top: 0,
  },
  scrollView: {
    flex: 1,
  },
})

export default FirestackNavigator