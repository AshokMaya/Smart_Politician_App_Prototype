import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';

const Lottie = ({src = '', style, ...props}) => {
  if (!src) {
    src = require('assets/lottie/loader.json');
  }

  return (
    <LottieView
      style={[styles.lottie, style]}
      source={src}
      autoPlay
      loop
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
    width: '60%',
  },
});

export default Lottie;
