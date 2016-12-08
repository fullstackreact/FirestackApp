import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Title, Content, Button, Spinner } from 'native-base';
import appStyles from '../../../styles/app';
import { UploadedImage } from '../components/UploadedImage';

const CAT_PATH = 'assets/images/cat.jpg';
export class DownloadDemo extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      downloading: false,
      downloadProgress: 0,
      downloadedFile: null,
      downloadingError: null
    }
  }

  componentWillMount() {
    const {firestack} = this.props;
    firestack.storage.setStorageUrl('firestack-example.appspot.com');
  }

  componentWillUnmount() {
    const {firestack} = this.props;
  }

  downloadByUrl() {
      const {firestack} = this.props;
      const storage = firestack.storage;
      const ref = storage.ref(CAT_PATH);
      const tmpDir = firestack.constants.TEMP_DIRECTORY_PATH;
      const localPath = `${tmpDir}/downloadedCat.jpg`;

      this.setState({
        downloadProgress: 0,
        downloading: true,
        downloadedFile: null,
        downloadingError: null
      }, () => {
        ref.download(localPath, (msg) => {
          if (msg.eventName === 'download_progress') {
            this.setState({
              downloadProgress: msg.progress
            });
          }
        })
        .then((res) => {
          console.log('download completed', res)
          this.setState({
            downloading: false,
            downloadedFile: Object.assign({}, res, {localPath})
          })
        })
        .catch(err => {
          console.log('an error in uploading', err);
          this.setState({
            downloading: false,
            downloadingError: err
          })
        });
      });
  }

  render() {
    const { downloadedFile, downloading } = this.state;

    return (
      <Container> 
        <Content>
          <Button
            block
            onPress={this.downloadByUrl.bind(this)}>
              Download with URL
          </Button>

          {downloadedFile && 
            <UploadedImage 
              image={{uri: downloadedFile.localPath}} />}
          {downloading && <Spinner />}
        </Content>
      </Container>
    )
  }

}

export default DownloadDemo