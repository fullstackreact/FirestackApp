import React from 'react'

import {
  View,
  Text,
  NativeModules
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Header, Title, Content, Button } from 'native-base';
import appStyles from '../../../styles/app';
import OAuthManager from 'react-native-oauth';

const supportedProviders = OAuthManager.providers();
export class Providers extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;
    const manager = new OAuthManager('firestackexample')
    manager.configure(env.auth);

    this.manager = manager;
  }

  loginWith(provider) {
    return (evt) => {
      console.log('loginWith', provider);
      this.manager
        .authorize(provider, {scopes: 'profile email'})
        .then(resp => {
          console.log('response ->', resp);
        })
        .catch(err => {
          console.log('error ->', err);
        })
    }
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  render() {
    return (
      <Container> 
        <Content>
        {supportedProviders.map(provider => {
          return (
            <Button
              key={provider}
              onPress={this.loginWith(provider)}>
                Login with {provider}
            </Button>
          )
        })}
        </Content>
      </Container>
    )
  }

}

export default Providers