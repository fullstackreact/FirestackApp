import React,{PixelRatio} from 'react-native';
import Dimensions from 'Dimensions';

const {width, height} = Dimensions.get('window');

export const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width, height
  }
}

export default Util;