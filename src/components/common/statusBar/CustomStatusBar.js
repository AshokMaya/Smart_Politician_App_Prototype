import React from 'react';
import {StatusBar, View} from 'react-native';

const CustomStatusBar = ({barStyle = 'white-content'}) => {
  return (
    <View>
      <>
        <StatusBar barStyle={barStyle} />
      </>
    </View>
  );
};

export default CustomStatusBar;
