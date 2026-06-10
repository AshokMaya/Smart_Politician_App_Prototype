import colors from 'assets/colors';
import React from 'react';
import { StyleSheet, View ,Text} from 'react-native';;


const Loader = ({showLoader, containerStyle, loaderSrc = '', lottieStyle}) => {
  return (
    <View
      style={[
        styles.container,
        showLoader ? styles.loaderContainer : styles.hideLoaderContainer,
        containerStyle,
      ]} >
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
  },
  loaderContainer: {
    position: 'absolute',
  },
  hideLoaderContainer: {
    display: 'none',
  },
  loadingText: {
    color: colors.white,
  },
});

export default Loader;
