import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window')

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    backgroundColor: '#E9E9EF',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  }
});

export default appStyles;