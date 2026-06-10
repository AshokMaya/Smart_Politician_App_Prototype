import colors from 'assets/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({containerStyle, children, applyShadow = true}) => {
  return (
    <View
      style={[
        styles.container,
        applyShadow ? styles.shadow : null,
        containerStyle,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  shadow: {
    shadowRadius: 6,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowColor: colors.black,
  },
});

export default Card;
