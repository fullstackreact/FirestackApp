import React from 'react'

import {
  View,
  NativeModules
} from 'react-native'

import env from '../../../../config/environment';
import { Container, 
  Content, Card, CardItem, 
  Thumbnail, Text, 
  Button } from 'native-base';

import appStyles from '../../../styles/app';

export class SignedIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillMount() {
    const {firestack} = this.props;
  }

  signOut(evt) {
    const {firestack} = this.props;
    firestack.auth.signOut();
    if (this.props.onSignout) {
      this.props.onSignout();
    }
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  render() {
    const { user } = this.props;
    return (
      <Container> 
        <Content>
           <Card>
              <CardItem >                       
                  <Text>You are signed in</Text>
                  <Text>{user.displayName}</Text>
              </CardItem>

              <CardItem cardBody> 
                  <Text>
                      
                  </Text>
                <Button 
                  onPress={this.signOut.bind(this)}
                  block
                  primary
                  textStyle={{color: '#FFFFFF'}}>
                    <Text>Sign out</Text>
                </Button>
            </CardItem>
         </Card>
        </Content>
      </Container>
    )
  }

}

export default SignedIn