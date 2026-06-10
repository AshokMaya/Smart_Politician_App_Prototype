import colors from 'assets/colors';
import {fontSize, fontWeight} from 'assets/typography';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {constants} from 'utils/constants';

const Button = ({
  title,
  onPress,
  style,
  disabled,
  textStyle,
  leadingIcon,
  trailingIcon,
  leadingIconStyle,
  trailingIconStyle,
}) => {
  return (
    <TouchableOpacity
      hitSlop={constants.hitSlop}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.signupButtonContainer,
        disabled && styles.disabledBtn,
        style,
      ]}>
      {leadingIcon ? <View style={leadingIconStyle}>{leadingIcon}</View> : null}
      {title ? (
        <Text style={[styles.signupButtonText, textStyle]}>{title}</Text>
      ) : null}
      {trailingIcon ? (
        <View style={trailingIconStyle}>{trailingIcon}</View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signupButtonContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primaryColor,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 41,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledBtn: {
    backgroundColor: colors.buttonDisabled,
    borderColor: colors.buttonDisabled,
  },

  signupButtonText: {
    textAlign: 'center',
    color: colors.white,
    ...fontSize.text16,
    ...fontWeight.w500,
    letterSpacing: 0.1,
  },
});

export default Button;
