import colors from 'assets/colors';
import { UserContext } from 'context/userContext';
import Navigation from 'navigation/Navigation';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  const {setUser} = useContext(UserContext);
  const [screenName, setScreenName] = useState('homeScreen');

  if (!screenName) {
    return (
      <View style={styles.container} />
    );
  }

  return <Navigation initialScreenName={screenName} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default SplashScreen;
