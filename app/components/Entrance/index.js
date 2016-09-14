import React, { Component } from 'react'
import {
  Animated,
  Easing,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import sizing from '../../utils/sizing';

import Icon from 'react-native-vector-icons/Ionicons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export class Entrance extends Component{
  static propTypes = {
    hideThis: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
       transformAnim: new Animated.Value(1), 
       opacityAnim: new Animated.Value(1), 
     };
  }

  componentDidMount() {
    Animated.timing(         
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
    ).start();
    Animated.timing(         
       this.state.opacityAnim,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);              
  }

  render () {
    return(
      <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
        <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="social-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
}

export default Entrance;

const styles = StyleSheet.create({
  entrance:{
    position: "absolute",
    top:0, left:0,
    height: sizing.height,
    width: sizing.width,
    backgroundColor:"#1b95e0",
    alignItems:"center",
    justifyContent:"center"
  }
});
