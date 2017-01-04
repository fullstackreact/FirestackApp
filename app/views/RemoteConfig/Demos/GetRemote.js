import React from 'react'

import {
  View,
  Text,
  NativeModules,
  Alert
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Header, Title, Content, Button } from 'native-base';
import appStyles from '../../../styles/app';

export class GetConfig extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      welcome_message: null
    }
  }

  componentWillMount() {
    const {firestack} = this.props;

    firestack.remoteConfig.fetchWithExpiration(0)
    .then(cfg => console.log(cfg))
    .catch(err => config.error(err))
  }

  getConfig() {
    let { firestack } = this.props;
    firestack.remoteConfig.config('welcome_message')
    .then(value => this.setState({welcome_message: value}))
    .catch(error => console.error(error));
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  render() {
    let { welcome_message } = this.state;

    return (
      <Container>
        <Content>
          <Button
            block
            onPress={this.getConfig.bind(this)}>
              Get Remote Config - welcome_message
          </Button>
          <Text>{welcome_message}</Text>
        </Content>
      </Container>
    )
  }

}

export default GetConfig
