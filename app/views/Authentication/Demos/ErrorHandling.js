import React from 'react'

import {
  View,
  Text,
  NativeModules
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Title, Content, Button } from 'native-base';
import appStyles from '../../../styles/app';

const ERRORS = {
  'badUsernamePassword': 1
}

export class ErrorHandling extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lastError: null
    }
  }

  componentWillMount() {
    const {firestack} = this.props;
    firestack.auth.listenForAuth((user) => {
      console.log('user -->', user);
    });
  }

  
  componentWillUnmount() {
    const {firestack} = this.props;
    firestack.auth.unlistenForAuth();
  }

  generateError(key) {
    const {firestack} = this.props;

    return () => {
      switch(key) {
        case ERRORS['badUsernamePassword']:
          firestack.auth.signInWithEmail('ari@fullstack.io', 'definitely_not_my_password')
          .then(user => console.log('Success'))
          .catch(err => {
            console.log('Error with signInWithEmail', err);
            this.setState({lastError: err})
          })
        break;
      }
    }
  }

  render() {
    return (
      <Container> 
        <Content>
          <Button
            onPress={this.generateError(ERRORS['badUsernamePassword'])}>
              Generate 
          </Button>
        </Content>
      </Container>
    )
  }

}

export default ErrorHandling