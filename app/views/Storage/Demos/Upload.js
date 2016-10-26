import React from 'react'

import {
  View,
  Text,
  Image
} from 'react-native'

import { 
  Container, Header, Title, Content, Button, Spinner
} from 'native-base';
import appStyles from '../../../styles/app';
import { UploadedImage } from '../components/UploadedImage';
const cat = require('image!cat');

export class UploadDemo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      fileUploaded: null,
      error: null
    }
  }

  componentWillMount() {
    const {firestack} = this.props;
    firestack.storage.setStorageUrl('firestack-example.appspot.com');
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  _uploadFile() {
    const {firestack} = this.props;
    const storage = firestack.storage;
    this.setState({
      fileUploaded: null,
      uploading: true
    }, () => {
      storage.uploadFile(`/assets/images/cat.jpg`, cat.path, {
        contentType: 'image/jpg'
      }).then(res => {
        // And store it
        const storageRef = firestack.storage.ref(res.fullPath); 
        storageRef.downloadUrl()
        .then(filepath => {
          this.setState({ 
            fileUploaded: filepath,
            error: null,
            uploading: false
          });
        });
      }).catch(err => {
        console.log('There was an error', err);
        this.setState({
          fileUploaded: null,
          uploading: false,
          error: err
        });
      });
    });
  }

  render() {
    const { uploading, fileUploaded } = this.state;
    return (
      <Container>
        <Content>
          <Button
            block
            onPress={this._uploadFile.bind(this)}>
              Upload file
          </Button>
          {fileUploaded && 
            <UploadedImage image={fileUploaded} />}
          {uploading && <Spinner />}
        </Content>
      </Container>
   )
  }

}

export default UploadDemo