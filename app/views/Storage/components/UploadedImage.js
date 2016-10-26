import React from 'react';
import { Text, Image } from 'react-native';
import { Card, CardItem } from 'native-base';

export const UploadedImage = ({image}) => {
  console.log('hi', image);
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

export default UploadedImage;