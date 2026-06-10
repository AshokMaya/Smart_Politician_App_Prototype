import colors from 'assets/colors';
import {fontSize} from 'assets/typography';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  DeviceEventEmitter,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Toast = ({timeout = 2000, context = 'root'}) => {
  const [toastMessage, setToastMessage] = useState({});
  const [notifications, setNotifications] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isShowing = useRef(false);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('toast', data => {
      setNotifications(prev => [...prev, data]);
    });

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    if (!isShowing.current && notifications.length > 0) {
      showNextToast();
    }
  }, [notifications]);

  const showNextToast = () => {
    const notification = notifications[0];
    if (!Object.keys(notification)?.length) {
      return;
    }

    isShowing.current = true;
    setToastMessage(notification);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          setToastMessage({});
          setNotifications(prev => prev.slice(1));
          isShowing.current = false;
        }
      });
    }, timeout);
  };

  if (
    !toastMessage?.message ||
    (typeof toastMessage?.context !== 'undefined' &&
      toastMessage?.context !== context)
  ) {
    return null;
  }

  return (
    <View style={[styles.toastContainer]}>
      <Animated.View style={[styles.card, {opacity: fadeAnim}]}>
        <View style={styles.iconContainer}>
          {/* {toastMessage?.status === 'success' ? <SuccessIcon /> : null}
          {toastMessage?.status === 'error' ? <ErrorIcon /> : null} */}
        </View>
        <Text style={styles.defaultText}>{toastMessage?.message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    left: 0,
    right: 0,
    zIndex: 999,
    bottom: 40,
    paddingHorizontal: 26,
    alignItems: 'center',
    position: 'absolute',
  },
  card: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowRadius: 6,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowColor:
      Platform.OS === 'ios'
        ? colors.cardShadowLightIos
        : colors.cardShadowLight,
    borderWidth: 1,
    borderColor: colors.toastBorder,
    backgroundColor: colors.containerBackground,
  },
  iconContainer: {alignSelf: 'flex-start'},
  defaultText: {
    ...fontSize.text15,
    color: colors.textBody,
    textAlign: 'center',
  },
});

export default Toast;
