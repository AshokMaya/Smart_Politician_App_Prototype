import colors from 'assets/colors';
import {fontSize, fontWeight} from 'assets/typography';
import useDimensions from 'hooks/useDimensions';

import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';

export const Textinput = ({
  label,
  isError,
  disabled,
  inputIcon,
  inputStyle,
  onChangeText,
  messageStyle,
  errorMessage,
  labelTextStyle,
  multiline,
  inputContainerStyle,
  placeholder = '',
  labelContainerStyle,
  placeholderStyle,
  ...props
}) => {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);
  const {height: inputHeight = 0} = useDimensions(ref);

  const animatedLabel = useRef(new Animated.Value(0)).current;
  const animatedPlaceHolder = useRef(new Animated.Value(0)).current;
  const animatedErrorMessage = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animatedLabelValue = Animated.timing(animatedLabel, {
      useNativeDriver: true,
      duration: 250,
      toValue: inputHeight / 2,
    });

    animatedLabelValue.start();

    const animatedPlaceHolderValue = Animated.timing(animatedPlaceHolder, {
      delay: 300,
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    });

    animatedPlaceHolderValue.start();

    return () => {
      animatedLabelValue.reset();
      animatedPlaceHolderValue.reset();
    };
  }, [animatedLabel, inputHeight, animatedPlaceHolder]);

  useEffect(() => {
    const animatedErrorMessageValue = Animated.timing(animatedErrorMessage, {
      toValue: 10,
      duration: 250,
      useNativeDriver: true,
    });
    if (isError) {
      animatedErrorMessageValue.start();
    } else {
      animatedErrorMessageValue.reset();
    }
    return () => {
      animatedErrorMessageValue.reset();
    };
  }, [animatedErrorMessage, isError, errorMessage]);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <View style={props?.containerStyle}>
      <View
        {...(!multiline && {ref})}
        style={[
          styles.inputContainer,
          inputContainerStyle,
          !multiline ? styles.singleLineTextInput : null,
          focused && {borderColor: colors.primaryColor},
          isError && {borderColor: colors.warning},
        ]}>
        {label ? (
          <Animated.View
            {...(multiline && {ref})}
            style={[
              styles.labelContainer,
              labelContainerStyle,
              {
                transform: [
                  {
                    translateY: animatedLabel.interpolate({
                      inputRange: [0, inputHeight / 2],
                      outputRange: [0, -(inputHeight / 2)],
                    }),
                  },
                ],
              },
            ]}>
            <Text
              style={[
                styles.labelText,
                {color: focused ? colors.primaryColor : colors.textSecondary},
                isError && {color: colors.warning},
                labelTextStyle,
              ]}>
              {label}
            </Text>
          </Animated.View>
        ) : null}

        <Animated.Text
          style={[
            styles.animatedPlaceholder,
            isError ? styles.animatedPlaceholderError : null,
            multiline ? styles.textAreaPlaceholder : null,
            label
              ? {
                  opacity: animatedPlaceHolder,
                }
              : null,
            props?.value ? styles.hidePlaceHolder : null,
            placeholderStyle,
          ]}>
          {placeholder}
        </Animated.Text>

        <TextInput
          {...props}
          editable={!disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={multiline}
          cursorColor={colors.primaryColor}
          onChangeText={onChangeText}
          style={[
            styles.input,
            multiline ? styles.textArea : null,
            inputIcon ? styles.inputWithTrailingIcon : null,
            disabled ? styles.disabledInput : null,
            inputStyle,
          ]}
        />
        {!multiline ? (
          <View style={styles.trailingIcon}>{inputIcon}</View>
        ) : null}
      </View>
      {isError && errorMessage ? (
        <Animated.Text
          style={[
            styles.errorMessage,
            messageStyle,
            {
              opacity: animatedErrorMessage.interpolate({
                inputRange: [0, 10],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: animatedErrorMessage.interpolate({
                    inputRange: [0, 10],
                    outputRange: [-10, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          {errorMessage}
        </Animated.Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderRadius: 10,
    borderColor: colors.secondaryBorder,
    borderWidth: 1,
    paddingHorizontal: 15,
    minWidth: '100%',
  },
  inputWithTrailingIcon: {
    paddingRight: 36,
  },
  singleLineTextInput: {justifyContent: 'center'},
  input: {
    ...fontSize.text15,
    color: colors.textPrimary,
    minHeight: 46,
    letterSpacing: 0.1,
  },
  textArea: {
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    left: 15,
  },
  labelText: {
    ...fontSize.text14,
    ...fontWeight.w500,
    letterSpacing: 0.1,
  },
  trailingIcon: {right: 16, position: 'absolute'},
  errorMessage: {
    color: colors.warning,
    lineHeight: 18,
    letterSpacing: 0.1,
    ...fontSize.text12,
    ...fontWeight.w500,
    paddingLeft: 16,
  },
  animatedPlaceholder: {
    paddingLeft: 18,
    position: 'absolute',
    color: colors.black,
    ...fontSize.text16,
  },
  textAreaPlaceholder: {
    top: 12,
  },
  animatedPlaceholderError: {
    color: colors.warning,
  },
  hidePlaceHolder: {
    display: 'none',
  },
  disabledInput: {
    color: colors.textSecondaryPlaceholder,
  },
});
