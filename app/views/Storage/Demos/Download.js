import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Header, Title, Content, Button } from 'native-base';
import appStyles from '../../../styles/app';

export class DownloadDemo extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  downloadByUrl() {
    const {firestack} = this.props;
    console.log('downloadByUrl called');
  }

  render() {
    return (
      <Container> 
        <Content>
          <Button
            block
            onPress={this.downloadByUrl.bind(this)}>
              Download with URL
          </Button>
        </Content>
      </Container>
    )
  }

}

export default DownloadDemo