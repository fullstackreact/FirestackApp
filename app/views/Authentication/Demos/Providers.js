import React from 'react'

import {
  View,
  Text,
  NativeModules
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Header, Title, Content, Button } from 'native-base';
import { List, ListItem } from 'native-base';

import appStyles from '../../../styles/app';
import OAuthManager from 'react-native-oauth';

const supportedProviders = OAuthManager.providers();

const opts = {
  google: {scopes: 'email,profile'},
  facebook: {},
  twitter: {},
  github: {},
  slack: {scopes: 'channels:read'}
}

export class Providers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accounts: {},
      data: [],
      loading: true
    }
  }

  componentWillMount() {
    const {firestack} = this.props;
    const manager = new OAuthManager('firestackexample')
    manager.configure(env.auth);
    this.manager = manager;
  }

  componentDidMount() {
    this.manager.savedAccounts()
      .then(resp => {
        const { accounts } = this.state;
        let newAccounts = {};
        resp.accounts
          .forEach(acc => newAccounts[acc.provider] = acc);
        this.setState({
          accounts: newAccounts,
          loading: false
        });
      })
      .catch(err => {
        console.log('error ->', err);
      })
  }

  loginWith(provider) {
    return (evt) => {
      this.manager
        .authorize(provider, opts[provider])
        .then(resp => {
          const {accounts} = this.state;
          const newAccounts = Object.assign({}, accounts, {
            [provider]: resp.response
          });
          this.setState({
            accounts: newAccounts
          });
        })
        .catch(err => {
          console.log('error ->', err);
        })
    }
  }

  logoutWith(provider) {
    return (evt) => {
      this.manager
        .deauthorize(provider)
        .then(resp => {
          let { accounts } = this.state;
          delete accounts[provider];
          this.setState({
            accounts
          });
        })
        .catch(err => {
          console.error('err ->', err);
        });
    }
  }

  makeRequest(provider) {
    return (evt) => {
      let url;
      let opts = {};
      let handleResp = (resp) => {
        this.setState({
          data: resp.data || []
        });
      }

      if (provider === 'twitter') {
        url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
        opts = {
          params: {
            screen_name: 'auser'
          }
        }
      } else if (provider === 'facebook') {
        url = '/me';
        handleResp = (resp) => {
          const {data} = resp;
          this.setState({
            data: [
              {id: 1, text: `User id: ${data.id}`},
              {id: 2, text: `User name: ${data.name}`}
            ]
          })
        }
      } else if (provider === 'google') {
        url = 'https://www.googleapis.com/plus/v1/people/me'
        handleResp = (resp) => {
          const {data} = resp;
          this.setState({
            data: [
              {id: 1, text: `displayName: ${data.displayName}`},
              {id: 2, text: `url: ${data.url}`},
              {id: 3, text: `domain: ${data.domain}`}
            ]
          });
        }
      } else if (provider === 'github') {
        url = '/users/auser/events'
        handleResp = resp => {
          const {data} = resp;
          const newData = data.map(d => ({id: d.id, text: `${d.type}: ${d.repo.name}`}))
          this.setState({ data: newData });
        }
      } else if (provider === 'slack') {
        url = '/channels.list'
        handleResp = resp => {
          const {channels} = resp.data
          const newData = channels.map(d => ({id: d.id, text: `${d.name}`}))
          this.setState({ data: newData });
        }
        opts.params = { token: 'access_token' }
      }

      this.manager
          .makeRequest(provider, url, opts)
          .then(resp => {
            handleResp(resp);
          })
          .catch(err => {
            console.log('caught an error', err);
          });
    }
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  render() {
    const { data, accounts } = this.state;
    return (
      <Container> 
        <Content>
        {supportedProviders.map(provider => {
          if (accounts[provider]) {
            return (
              <Button
                warning
                key={provider}
                onPress={this.logoutWith(provider)}>
                  Logout of {provider}
              </Button>
            );
          } else {
            return (
              <Button
                primary
                key={provider}
                onPress={this.loginWith(provider)}>
                  Login with {provider}
              </Button>
            )
          }
        })}
        {supportedProviders.map(provider => {
          if (accounts[provider]) {
            return (
              <Button
                info
                key={provider}
                onPress={this.makeRequest(provider)}>
                  Make request to {provider}
              </Button>
            );
          }
        })}
        <List>
          {data.map(datum => {
            return (
              <ListItem key={datum.id}>
                <Text>{datum.text}</Text>
              </ListItem>
            )
          })}
        </List>
        </Content>
      </Container>
    )
  }

}

export default Providers