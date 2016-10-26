import React from 'react'

import {
  View,
  Text,
  Image
} from 'react-native'

import { 
  Container, Header, Title, Content, Button,
  Card, CardItem, Spinner
} from 'native-base';
import appStyles from '../../../styles/app';
const cat = require('image!cat');

const UploadedImage = ({image}) => {
  console.log('uploadedImage ->', image);
  return (
    <Card>
      <CardItem>
          <Text>Uploaded file</Text>
      </CardItem>

      <CardItem>                        
          <Image 
            style={{ resizeMode: 'cover' }} 
            source={image} /> 
      </CardItem>
    </Card>
  )
}

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
        <View style={[appStyles.description, appStyles.center]}>
          <Text>
            This demo uploads a local resource to the firestack storage
            and then uses `downloadUrl()` to download and display the image
          </Text>
        </View>

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