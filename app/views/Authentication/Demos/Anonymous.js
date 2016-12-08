import React from 'react'

import {
  View,
  Text,
  NativeModules
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Title, Content, Button } from 'native-base';
import appStyles from '../../../styles/app';

export class Anonymous extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;
  }

  loginAnonymously(evt) {
    const {firestack} = this.props;
    firestack.auth.signInAnonymously()
      .then(u => {
        console.log('Signed in!', u);
      })
      .catch(err => {
        console.log('An error occurred', err);
      })
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  render() {
    return (
      <Container> 
        <Content>
          <Button
            onPress={this.loginAnonymously.bind(this)}>
              Anonymously login
          </Button>
        </Content>
      </Container>
    )
  }

}

export default Anonymous