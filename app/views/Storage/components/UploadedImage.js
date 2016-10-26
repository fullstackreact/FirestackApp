import React from 'react';
import { Text, Image } from 'react-native';
import { Card, CardItem } from 'native-base';

export const UploadedImage = ({image, title = 'File'}) => {
  return (
    <Card>
      <CardItem>
          <Text>{title}</Text>
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