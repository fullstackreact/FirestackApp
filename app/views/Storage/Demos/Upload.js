import React from 'react'

import {
  View,
  Text,
  Image,
  CameraRoll
} from 'react-native'

import { 
  Container, Title, Content, Button, Spinner
} from 'native-base';

import appStyles from '../../../styles/app';
import { UploadedImage } from '../components/UploadedImage';

let localFile;
export class UploadDemo extends React.Component {

  constructor(props) {
    super(props);
    
    const {firestack} = this.props;

    localDir = firestack.constants.DOCUMENT_DIRECTORY_PATH;
    this.state = {
      localFileExists: false,
      uploading: false,
      fileUploaded: null,
      error: null
    }
  }

  componentWillMount() {
    const {firestack} = this.props;
    firestack.storage.setStorageUrl('firestack-example.appspot.com');

    CameraRoll.getPhotos({
      first: 1
    }).then(data => {
      const assets = data.edges.map(asset => asset.node.image);
      if (assets && assets.length > 0) { 
        firestack.storage.getRealPathFromURI(assets[0].uri)
        .then(path => {
          localFile = path;
          this.setState({
            localFileExists: true
          });
        });
      } else {
        throw new Error('no assets yet');
      }
    }).catch(err => {
      this.setState({
        localFileExists: false,
        error: err
      });
    });
    // console.log('cat cat', cat);
    // RNFS.writeFile(localFile, cat, 'utf8')
    // .then((success) => {
    //   this.setState({
    //     localFileExists: true
    //   });
    // })
    // .catch((err) => {
    //   this.setState({
    //     localFileExists: false,
    //     error: err
    //   });
    // });
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
      storage.uploadFile(`/assets/images/cat.jpg`, localFile, {
        contentType: 'image/jpg'
      }).then(res => {
        // And store it
        const storageRef = firestack.storage.ref(res.fullPath); 
        storageRef.downloadUrl()
        .then(filepath => {
          console.log('filepath ->', filepath);
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
    const { localFileExists, uploading, fileUploaded } = this.state;
    return (
      <Container>
        <Content>
        { localFileExists ? 
          (<Button
            block
            onPress={this._uploadFile.bind(this)}>
              Upload file
          </Button>) :
          ( <Text>Not ready yet...</Text>)
        }
          {fileUploaded && 
            <UploadedImage image={fileUploaded} />}
          {uploading && <Spinner />}
        </Content>
      </Container>
   )
  }

}

export default UploadDemo