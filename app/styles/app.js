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
  description: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F6F6',
  },
  rowText: {
    fontSize: 18
  }
});

export default appStyles;