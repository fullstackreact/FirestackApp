import React from 'react'

import {
  View,
  Text,
  NativeModules
} from 'react-native'

import env from '../../../../config/environment';

// import { Container, Header, Title, Content, List, ListItem, InputGroup, Input, Icon, Button } from 'native-base';

import SignedIn from '../components/SignedIn';
import appStyles from '../../../styles/app';

export class Email extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    const {firestack} = this.props;

    this.unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      console.log('auth state changed', user);
    });
    // firestack.auth.listenForAuth((u) => {
    //   console.log('listenForAuth ->', u);
    // });
  }

  fillInFields() {
    this.setState({
      email: 'ari@fullstack.io',
      password: '123456'
    });
  }

  loginWithEmail(evt) {
    const {firestack} = this.props;
    const { email, password } = this.state;

    firestack.auth().signInWithEmailAndPassword(email, password)
      .then(u => {
        console.log('Signed in!', u);
        this.setState({
          user: u,
          email: '',
          password: ''
        });
      })
      .catch(err => {
        console.log('An error occurred', err);
      });
  }

  onSignout() {
    console.log('yay?', this.state);
    this.setState({
      user: null,
      email: '',
      password: ''
    });
  }

  componentWillUnmount() {
    const {firestack} = this.props;
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const {firestack} = this.props;
    const { user, email, password } = this.state;
    if (user) {
      return (
        <SignedIn
          user={user}
          firestack={firestack}
          onSignout={this.onSignout.bind(this)} />
      )
    }
    return (
      <View> 
        <View>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name='ios-person' />
                <Input 
                  placeholder='EMAIL'
                  value={email} />
              </InputGroup>
            </ListItem>

            <ListItem>
              <InputGroup>
                <Icon name='ios-unlock' />
                <Input 
                  placeholder='PASSWORD'
                  secureTextEntry={true}
                  value={password}
                />
              </InputGroup>
            </ListItem>
                      
            <ListItem>
              <Button
                block
                info
                onPress={this.loginWithEmail.bind(this)}>
                  <Text>Sign in</Text>
              </Button>
            </ListItem>

            <ListItem>
              <Button
                block
                info
                onPress={this.fillInFields.bind(this)}>
                  <Text>Fill forms with demo user info</Text>
              </Button>
            </ListItem>
          </List>
        </View>
      </View>
    )
  }

}

export default Email