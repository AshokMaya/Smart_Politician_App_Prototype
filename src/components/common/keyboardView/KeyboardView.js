import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const isIos = Platform.OS === 'ios';
const KeyboardView = ({children, containerStyle}) => {
  return (
    <>
      {isIos ? (
        <SafeAreaView style={[styles.container, containerStyle]}>
          <KeyboardAvoidingView
            behavior="padding"
            style={[styles.container, containerStyle]}>
            {children}
          </KeyboardAvoidingView>
        </SafeAreaView>
      ) : (
        children
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardView;
