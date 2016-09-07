import React, { Component } from 'react';
import {
  Text,
  View,
  NavigationExperimental
} from 'react-native';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;


import ExampleList from './views/ExampleList'

import styles from './styles/app';

export class FirestackApp extends Component {
  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.stack}
        style={styles.container}
        renderHeader={this._renderHeader}
        renderScene={this._renderScene}
        onNavigateBack={this._handleBack}
      />
    );
  }

  _renderHeader(props: NavigationSceneRendererProps): ReactElement<any> {
    return (
      <NavigationHeader
        {...props}
        onNavigateBack={this._handleBack}
        renderTitleComponent={this._renderTitleComponent}
      />
    );
  }

  _renderTitleComponent(props: NavigationSceneRendererProps): ReactElement<any> {
    return (
      <NavigationHeader.Title>
        Firestack Example App
      </NavigationHeader.Title>
    );
  }

  _renderScene(props: NavigationSceneRendererProps): ?ReactElement<any> {
    const state = props.scene.route;
    if (state.key === 'AppList') {
      return (
        <ExampleList
          onNavigate={this._handleAction}
          list={UIExplorerList}
          style={styles.exampleContainer}
          {...state}
        />
      );
    }
}

export default FirestackApp